import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabase.js';
import { uploadToBucket, deleteFromBucket } from '../../lib/storage.js';
import { extractYouTubeId, getYouTubeThumbnail } from '../../lib/youtube.js';
import { GALLERY_CATEGORIES } from '../../lib/constants.js';
import { Upload, Youtube, Trash2, Star, RefreshCw, Plus } from 'lucide-react';

export default function GalleryAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Photo Upload Form
  const [photoMeta, setPhotoMeta] = useState({
    title_en: '',
    title_fr: '',
    description_en: '',
    category: 'architecture',
    is_featured_home: false,
  });

  // YouTube URL Form
  const [ytInput, setYtInput] = useState({
    url: '',
    title_en: '',
    title_fr: '',
    description_en: '',
    category: 'talks',
    duration: '',
    is_featured_home: true,
  });

  // Channel Feed Importer
  const [channelId, setChannelId] = useState('');
  const [channelVideos, setChannelVideos] = useState([]);
  const [fetchingChannel, setFetchingChannel] = useState(false);

  const loadGallery = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    try {
      const [{ data: mediaData }, { data: settingRow }] = await Promise.all([
        supabase
          .from('gallery_media')
          .select('*')
          .order('display_order', { ascending: true })
          .order('created_at', { ascending: false }),
        supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'youtube_channel_id')
          .maybeSingle(),
      ]);
      setItems(mediaData || []);
      if (settingRow?.value) setChannelId(String(settingRow.value || ''));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGallery();
  }, [loadGallery]);

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    try {
      for (const file of files) {
        const res = await uploadToBucket('resort-gallery', file, 'media');
        const fallbackTitle = file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ');
        const titleEn = photoMeta.title_en.trim() || fallbackTitle;
        const titleFr = photoMeta.title_fr.trim() || titleEn;

        const { error } = await supabase.from('gallery_media').insert({
          media_type: 'image',
          title_en: titleEn,
          title_fr: titleFr,
          description_en: photoMeta.description_en || '',
          description_fr: photoMeta.description_en || '',
          category: photoMeta.category,
          image_url: res.publicUrl,
          storage_path: res.storagePath,
          is_featured_home: photoMeta.is_featured_home,
          is_published: true,
        });
        if (error) throw error;
      }
      toast.success(`Uploaded ${files.length} photo(s) to Supabase Storage!`);
      setPhotoMeta({ ...photoMeta, title_en: '', title_fr: '', description_en: '' });
      loadGallery();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleAddYouTube = async (e) => {
    e.preventDefault();
    const videoId = extractYouTubeId(ytInput.url);
    if (!videoId) {
      toast.error('Please enter a valid YouTube URL or 11-character video ID.');
      return;
    }

    try {
      let titleEn = ytInput.title_en.trim();
      if (!titleEn && supabase) {
        // Attempt quick oEmbed auto-title via Edge Function
        const { data: fnData } = await supabase.functions.invoke('youtube-channel-feed', {
          body: { url: `https://www.youtube.com/watch?v=${videoId}` },
        });
        titleEn = fnData?.video?.title || `Resort Video (${videoId})`;
      }

      const { error } = await supabase.from('gallery_media').insert({
        media_type: 'youtube',
        title_en: titleEn || `Resort Video (${videoId})`,
        title_fr: ytInput.title_fr.trim() || titleEn || `Vidéo du Resort (${videoId})`,
        description_en: ytInput.description_en || '',
        description_fr: ytInput.description_en || '',
        category: ytInput.category,
        youtube_video_id: videoId,
        youtube_url: `https://www.youtube.com/watch?v=${videoId}`,
        youtube_duration: ytInput.duration || '',
        is_featured_home: ytInput.is_featured_home,
        is_published: true,
      });
      if (error) throw error;
      toast.success('YouTube video published to gallery!');
      setYtInput({ ...ytInput, url: '', title_en: '', title_fr: '', description_en: '', duration: '' });
      loadGallery();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleFetchChannel = async () => {
    if (!channelId.trim() || !supabase) {
      toast.error('Enter a YouTube Channel ID (starts with UC...)');
      return;
    }
    setFetchingChannel(true);
    try {
      const { data, error } = await supabase.functions.invoke('youtube-channel-feed', {
        body: { channel_id: channelId.trim() },
      });
      if (error) throw error;
      setChannelVideos(data?.videos || []);
      if ((data?.videos || []).length === 0) {
        toast('No recent videos found on that channel feed.');
      }
    } catch (err) {
      toast.error(err.message || 'Could not fetch channel feed.');
    } finally {
      setFetchingChannel(false);
    }
  };

  const importChannelVideo = async (v) => {
    try {
      const { error } = await supabase.from('gallery_media').insert({
        media_type: 'youtube',
        title_en: v.title,
        title_fr: v.title,
        description_en: v.description || '',
        description_fr: v.description || '',
        category: 'talks',
        youtube_video_id: v.youtube_video_id,
        youtube_url: v.youtube_url,
        youtube_published_at: v.published_at,
        is_featured_home: false,
        is_published: true,
      });
      if (error) throw error;
      toast.success(`Imported "${v.title}"`);
      loadGallery();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const toggleFeatured = async (item) => {
    const { error } = await supabase
      .from('gallery_media')
      .update({ is_featured_home: !item.is_featured_home })
      .eq('id', item.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    loadGallery();
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.title_en}" from gallery?`)) return;
    try {
      if (item.storage_path) {
        await deleteFromBucket('resort-gallery', item.storage_path);
      }
      const { error } = await supabase.from('gallery_media').delete().eq('id', item.id);
      if (error) throw error;
      toast.success('Removed from gallery');
      loadGallery();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const existingYoutubeIds = new Set(items.map((i) => i.youtube_video_id).filter(Boolean));
  const previewYtId = extractYouTubeId(ytInput.url);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-volcanic mb-1">Online Gallery & YouTube Videos</h1>
        <p className="text-sm text-volcanic/60 mb-0">
          Upload photography to Supabase Storage and reference YouTube videos directly from your channel.
        </p>
      </div>

      {/* Upload + YouTube Panels */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upload Photo */}
        <div className="bg-white rounded-3xl p-6 border border-sand shadow-sm space-y-4">
          <h2 className="text-xl font-serif text-ocean mb-0">Upload Resort Photos</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Title (EN) — optional for bulk"
              value={photoMeta.title_en}
              onChange={(e) => setPhotoMeta({ ...photoMeta, title_en: e.target.value })}
              className={inp}
            />
            <input
              type="text"
              placeholder="Title (FR)"
              value={photoMeta.title_fr}
              onChange={(e) => setPhotoMeta({ ...photoMeta, title_fr: e.target.value })}
              className={inp}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-3 items-center">
            <select
              value={photoMeta.category}
              onChange={(e) => setPhotoMeta({ ...photoMeta, category: e.target.value })}
              className={inp}
            >
              {GALLERY_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.labelEn}</option>
              ))}
            </select>
            <label className="flex items-center gap-2 text-xs font-semibold">
              <input
                type="checkbox"
                checked={photoMeta.is_featured_home}
                onChange={(e) => setPhotoMeta({ ...photoMeta, is_featured_home: e.target.checked })}
                className="w-4 h-4 accent-lush"
              />
              Feature on Home Page
            </label>
          </div>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-sand hover:border-lush rounded-2xl p-6 cursor-pointer transition-colors bg-sand/15">
            <Upload className="w-7 h-7 text-lush mb-2" />
            <span className="text-xs font-bold text-volcanic">
              {uploading ? 'Optimizing & Uploading...' : 'Click to select one or multiple photos'}
            </span>
            <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
          </label>
        </div>

        {/* Add YouTube Video */}
        <form onSubmit={handleAddYouTube} className="bg-white rounded-3xl p-6 border border-sand shadow-sm space-y-4">
          <h2 className="text-xl font-serif text-ocean mb-0 flex items-center gap-2">
            <Youtube className="w-5 h-5 text-rose-600" /> Reference a YouTube Video
          </h2>
          <input
            type="text"
            required
            placeholder="Paste YouTube URL (watch?v=..., youtu.be/..., shorts/...) or ID"
            value={ytInput.url}
            onChange={(e) => setYtInput({ ...ytInput, url: e.target.value })}
            className={inp}
          />
          {previewYtId && (
            <div className="flex items-center gap-3 bg-sand/30 p-2 rounded-xl">
              <img
                src={getYouTubeThumbnail(previewYtId)}
                alt="YouTube preview"
                className="w-24 h-14 rounded-lg object-cover"
              />
              <span className="text-xs font-mono text-ocean">ID: {previewYtId}</span>
            </div>
          )}
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Video Title (auto-fetched if blank)"
              value={ytInput.title_en}
              onChange={(e) => setYtInput({ ...ytInput, title_en: e.target.value })}
              className={inp}
            />
            <select
              value={ytInput.category}
              onChange={(e) => setYtInput({ ...ytInput, category: e.target.value })}
              className={inp}
            >
              {GALLERY_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.labelEn}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between gap-4">
            <label className="flex items-center gap-2 text-xs font-semibold">
              <input
                type="checkbox"
                checked={ytInput.is_featured_home}
                onChange={(e) => setYtInput({ ...ytInput, is_featured_home: e.target.checked })}
                className="w-4 h-4 accent-lush"
              />
              Feature on Home
            </label>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-volcanic hover:bg-lush text-white hover:text-[#0e1a28] text-xs font-bold uppercase tracking-wider"
            >
              Publish Video
            </button>
          </div>
        </form>
      </div>

      {/* Sync from YouTube Channel Feed */}
      <div className="bg-white rounded-3xl p-6 border border-sand shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-serif text-volcanic mb-0">Import from YouTube Channel</h2>
            <p className="text-xs text-volcanic/60 mb-0">
              Pull recent uploads directly from your YouTube channel feed (Channel ID starts with <code className="font-mono">UC...</code>).
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="UCxxxxxxxxxxxx"
              value={channelId}
              onChange={(e) => setChannelId(e.target.value)}
              className={`${inp} w-56`}
            />
            <button
              type="button"
              disabled={fetchingChannel}
              onClick={handleFetchChannel}
              className="px-4 py-2 rounded-xl bg-ocean hover:bg-volcanic text-white text-xs font-bold inline-flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${fetchingChannel ? 'animate-spin' : ''}`} />
              Load Feed
            </button>
          </div>
        </div>

        {channelVideos.length > 0 && (
          <div className="grid md:grid-cols-3 gap-4 pt-2">
            {channelVideos.map((v) => {
              const alreadyAdded = existingYoutubeIds.has(v.youtube_video_id);
              return (
                <div key={v.youtube_video_id} className="border border-sand rounded-2xl overflow-hidden flex flex-col">
                  <img src={v.thumbnail_url} alt={v.title} className="h-32 w-full object-cover" />
                  <div className="p-3 flex-1 flex flex-col">
                    <p className="text-xs font-bold text-volcanic line-clamp-2 mb-3">{v.title}</p>
                    <button
                      type="button"
                      disabled={alreadyAdded}
                      onClick={() => importChannelVideo(v)}
                      className="mt-auto w-full py-2 rounded-lg bg-lush text-volcanic text-[11px] font-bold uppercase disabled:opacity-40 inline-flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {alreadyAdded ? 'Already in Gallery' : 'Import to Gallery'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Existing Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {loading
          ? [1, 2, 3, 4].map((n) => (
              <div key={n} className="aspect-[4/5] bg-white rounded-2xl animate-pulse border border-sand" />
            ))
          : items.map((item) => {
              const isVideo = item.media_type === 'youtube';
              const thumb = isVideo ? getYouTubeThumbnail(item.youtube_video_id) : item.image_url;
              return (
                <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-sand shadow-sm flex flex-col">
                  <div className="aspect-[4/3] relative bg-volcanic/10">
                    <img src={thumb} alt={item.title_en} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-black/75 text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-full">
                      {isVideo ? 'YouTube' : 'Photo'}
                    </span>
                  </div>
                  <div className="p-3.5 flex-1 flex flex-col">
                    <p className="text-xs font-bold text-volcanic truncate mb-0.5">{item.title_en}</p>
                    <p className="text-[10px] uppercase tracking-wider text-lush font-bold mb-3">
                      {item.category}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2 border-t border-sand/60">
                      <button
                        type="button"
                        onClick={() => toggleFeatured(item)}
                        className={`text-[10px] font-bold inline-flex items-center gap-1 ${
                          item.is_featured_home ? 'text-lush' : 'text-volcanic/40'
                        }`}
                      >
                        <Star className={`w-3.5 h-3.5 ${item.is_featured_home ? 'fill-current' : ''}`} />
                        Home
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item)}
                        className="text-rose-600 hover:text-rose-800 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

const inp =
  'w-full bg-sand/30 border border-sand rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-lush text-volcanic';
