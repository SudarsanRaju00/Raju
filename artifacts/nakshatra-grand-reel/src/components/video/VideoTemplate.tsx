import { useEffect, useRef, type ComponentType } from 'react';
import { AnimatePresence } from 'framer-motion';

import {
  VideoCanvas,
  VideoPausedContext,
  useVideoPlayer,
  type VideoAspectRatio,
} from '@/lib/video';

import { ShotOne } from './video_scenes/ShotOne';
import { ShotTwo } from './video_scenes/ShotTwo';
import { ShotThree } from './video_scenes/ShotThree';
import { ShotFour } from './video_scenes/ShotFour';
import { ShotFive } from './video_scenes/ShotFive';
import { ShotSix } from './video_scenes/ShotSix';

export const SCENE_DURATIONS = {
  shotOne: 4200,
  shotTwo: 4400,
  shotThree: 4600,
  shotFour: 4500,
  shotFive: 4800,
  shotSix: 4500,
};

const VIDEO_ASPECT_RATIO: VideoAspectRatio = '9:16';

const SCENE_COMPONENTS: Record<string, ComponentType> = {
  shotOne: ShotOne,
  shotTwo: ShotTwo,
  shotThree: ShotThree,
  shotFour: ShotFour,
  shotFive: ShotFive,
  shotSix: ShotSix,
};

interface VideoTemplateProps {
  durations?: Record<string, number>;
  loop?: boolean;
  paused?: boolean;
  muted?: boolean;
  onSceneChange?: (sceneKey: string) => void;
}

const SCENE_START_SEC: Record<string, number> = (() => {
  const starts: Record<string, number> = {};
  let cumulativeMs = 0;
  for (const [key, duration] of Object.entries(SCENE_DURATIONS)) {
    starts[key] = cumulativeMs / 1000;
    cumulativeMs += duration;
  }
  return starts;
})();

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  paused = false,
  muted = false,
  onSceneChange,
}: VideoTemplateProps = {}) {
  const { currentSceneKey } = useVideoPlayer({ durations, loop, paused });
  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '');
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastSceneKeyRef = useRef<string | null>(null);

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    if (paused) {
      audio.pause();
      return;
    }
    if (lastSceneKeyRef.current !== currentSceneKey) {
      lastSceneKeyRef.current = currentSceneKey;
      const targetTime = SCENE_START_SEC[baseSceneKey] ?? 0;
      if (Math.abs(audio.currentTime - targetTime) > 0.18) {
        audio.currentTime = targetTime;
      }
    }
    audio.play().catch(() => {});
  }, [baseSceneKey, currentSceneKey, muted, paused]);

  return (
    <VideoPausedContext.Provider value={paused}>
      <>
        <VideoCanvas
          aspectRatio={VIDEO_ASPECT_RATIO}
          className="video-stage"
          style={{ backgroundColor: 'var(--color-bg-dark)' }}
        >
          <AnimatePresence mode="sync" initial={false}>
            {SceneComponent && (
              <SceneComponent key={currentSceneKey} />
            )}
          </AnimatePresence>
        </VideoCanvas>
        <audio
          ref={audioRef}
          src={`${import.meta.env.BASE_URL}audio/bg_music.mp3`}
          preload="auto"
          autoPlay
          muted={muted}
        />
      </>
    </VideoPausedContext.Provider>
  );
}