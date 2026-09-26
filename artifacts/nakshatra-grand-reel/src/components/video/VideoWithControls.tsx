import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from 'react';
import {
  ChevronDown,
  ChevronUp,
  Pause,
  Play,
  Repeat,
  Volume2,
  VolumeX,
} from 'lucide-react';

import VideoTemplate, {
  SCENE_DURATIONS,
} from '@/components/video/VideoTemplate';
import { useSceneControls } from './useSceneControls';

const PROGRESS_TICK_MS = 60;

const SCENE_DETAILS: Record<
  string,
  { title: string; filePath: string }
> = {
  shotOne: {
    title: 'Come hungry',
    filePath: 'src/components/video/video_scenes/ShotOne.tsx',
  },
  shotTwo: {
    title: 'A little more than dinner',
    filePath: 'src/components/video/video_scenes/ShotTwo.tsx',
  },
  shotThree: {
    title: 'Andhra, served',
    filePath: 'src/components/video/video_scenes/ShotThree.tsx',
  },
  shotFour: {
    title: 'Leave glowing',
    filePath: 'src/components/video/video_scenes/ShotFour.tsx',
  },
  shotFive: {
    title: 'Make an evening of it',
    filePath: 'src/components/video/video_scenes/ShotFive.tsx',
  },
  shotSix: {
    title: 'Nakshatra Grand',
    filePath: 'src/components/video/video_scenes/ShotSix.tsx',
  },
};

function formatPlaybackTime(durationMs: number) {
  const totalSeconds = Math.max(0, Math.floor(durationMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function announceSceneSelection(index: number, sceneKeys: string[]) {
  const key = sceneKeys[index];
  const details = SCENE_DETAILS[key];
  if (!details?.filePath) return;
  window.parent.postMessage(
    {
      type: 'REPLIT_VIDEO_SCENE_SELECTED',
      payload: {
        sceneIndex: index,
        sceneCount: sceneKeys.length,
        sceneTitle: details.title || key,
        filePath: details.filePath,
        lineNumber: 1,
      },
    },
    '*',
  );
}

function PlaybackStatus({
  sceneKeys,
  activeIndex,
  activeDuration,
  activeStartTime,
  totalDuration,
  tick,
  paused,
  onJumpTo,
}: {
  sceneKeys: string[];
  activeIndex: number;
  activeDuration: number;
  activeStartTime: number;
  totalDuration: number;
  tick: number;
  paused: boolean;
  onJumpTo: (index: number) => void;
}) {
  const [elapsed, setElapsed] = useState(0);
  const elapsedBaseRef = useRef(0);

  useEffect(() => {
    setElapsed(0);
    elapsedBaseRef.current = 0;
  }, [tick]);

  useEffect(() => {
    if (paused) return;
    const startedAt = performance.now();
    const id = window.setInterval(() => {
      setElapsed(elapsedBaseRef.current + (performance.now() - startedAt));
    }, PROGRESS_TICK_MS);
    return () => {
      window.clearInterval(id);
      elapsedBaseRef.current += performance.now() - startedAt;
    };
  }, [paused, tick]);

  const progress =
    activeDuration > 0 ? Math.min(1, elapsed / activeDuration) : 0;
  const totalElapsed = Math.min(
    totalDuration,
    activeStartTime + Math.min(elapsed, activeDuration),
  );

  return (
    <>
      <div className="control-progress">
        {sceneKeys.map((key, index) => {
          const isActive = index === activeIndex;
          const fill = isActive ? progress * 100 : 0;
          return (
            <button
              key={key}
              type="button"
              className="control-segment"
              onClick={() => onJumpTo(index)}
              aria-label={`Jump to scene ${index + 1}`}
              aria-current={isActive ? 'true' : undefined}
            >
              <span style={{ width: `${fill}%` }} />
            </button>
          );
        })}
      </div>
      <div className="control-counter">
        {activeIndex + 1}/{sceneKeys.length}
      </div>
      <div
        className="control-timer"
        role="timer"
        aria-label={`Playback time ${formatPlaybackTime(totalElapsed)} of ${formatPlaybackTime(totalDuration)}`}
      >
        {formatPlaybackTime(totalElapsed)} / {formatPlaybackTime(totalDuration)}
      </div>
    </>
  );
}

function ControlBar({
  visible,
  collapsed,
  locked,
  paused,
  muted,
  sceneKeys,
  activeIndex,
  activeDuration,
  activeStartTime,
  totalDuration,
  tick,
  onTogglePause,
  onToggleLock,
  onToggleMute,
  onJumpTo,
  onToggleCollapsed,
}: {
  visible: boolean;
  collapsed: boolean;
  locked: boolean;
  paused: boolean;
  muted: boolean;
  sceneKeys: string[];
  activeIndex: number;
  activeDuration: number;
  activeStartTime: number;
  totalDuration: number;
  tick: number;
  onTogglePause: () => void;
  onToggleLock: () => void;
  onToggleMute: () => void;
  onJumpTo: (index: number) => void;
  onToggleCollapsed: () => void;
}) {
  return (
    <div className={`control-bar ${visible ? 'control-bar-visible' : ''}`}>
      <button
        type="button"
        className="control-button"
        onClick={onTogglePause}
        title={paused ? 'Play' : 'Pause'}
        aria-label={paused ? 'Play' : 'Pause'}
      >
        {paused ? <Play /> : <Pause />}
      </button>
      <button
        type="button"
        className={`control-button ${locked ? 'control-button-active' : ''}`}
        onClick={onToggleLock}
        title={locked ? 'Loop current scene: on' : 'Loop current scene: off'}
        aria-label={locked ? 'Loop current scene: on' : 'Loop current scene: off'}
        aria-pressed={locked}
      >
        <Repeat />
      </button>
      <button
        type="button"
        className="control-button"
        onClick={onToggleMute}
        title={muted ? 'Unmute' : 'Mute'}
        aria-label={muted ? 'Unmute' : 'Mute'}
        aria-pressed={muted}
      >
        {muted ? <VolumeX /> : <Volume2 />}
      </button>
      <span className="control-divider" aria-hidden="true" />
      <PlaybackStatus
        sceneKeys={sceneKeys}
        activeIndex={activeIndex}
        activeDuration={activeDuration}
        activeStartTime={activeStartTime}
        totalDuration={totalDuration}
        tick={tick}
        paused={paused}
        onJumpTo={onJumpTo}
      />
      <button
        type="button"
        className="control-button"
        onClick={onToggleCollapsed}
        title={collapsed ? 'Show controls' : 'Hide controls'}
        aria-label={collapsed ? 'Show controls' : 'Hide controls'}
        aria-expanded={!collapsed}
      >
        {collapsed ? <ChevronUp /> : <ChevronDown />}
      </button>
    </div>
  );
}

export default function VideoWithControls() {
  const isIframed =
    typeof window !== 'undefined' && window.self !== window.top;
  const [muted, setMuted] = useState(false);
  const sensorRef = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [tapPinned, setTapPinned] = useState(false);
  const {
    sceneKeys,
    activeIndex,
    locked,
    paused,
    mountKey,
    tick,
    durations,
    activeDuration,
    activeStartTime,
    totalDuration,
    onSceneChange,
    jumpTo,
    toggleLock,
    togglePause,
  } = useSceneControls(SCENE_DURATIONS);

  const handleJumpTo = useCallback(
    (index: number) => {
      jumpTo(index);
      announceSceneSelection(index, sceneKeys);
    },
    [jumpTo, sceneKeys],
  );

  const handlePointerEnter = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') setHovering(true);
  }, []);

  const handlePointerLeave = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') setHovering(false);
  }, []);

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== 'mouse' && collapsed) setTapPinned(true);
    },
    [collapsed],
  );

  const handleToggleCollapsed = useCallback(() => {
    setCollapsed((value) => {
      if (!value) {
        setHovering(false);
        setTapPinned(false);
      }
      return !value;
    });
  }, []);

  useEffect(() => {
    if (!(collapsed && tapPinned)) return;
    const handleDocumentPointerDown = (event: globalThis.PointerEvent) => {
      if (event.pointerType === 'mouse') return;
      const sensor = sensorRef.current;
      if (sensor && !sensor.contains(event.target as Node)) {
        setTapPinned(false);
      }
    };
    document.addEventListener('pointerdown', handleDocumentPointerDown);
    return () =>
      document.removeEventListener('pointerdown', handleDocumentPointerDown);
  }, [collapsed, tapPinned]);

  useEffect(() => {
    if (!paused) return;
    const frozen = document
      .getAnimations()
      .filter((animation) => animation.playState === 'running');
    frozen.forEach((animation) => animation.pause());
    return () => frozen.forEach((animation) => animation.play());
  }, [paused]);

  if (!isIframed) return <VideoTemplate />;

  const barVisible = !collapsed || hovering || tapPinned;

  return (
    <div className="video-controls-shell">
      <VideoTemplate
        key={mountKey}
        durations={durations}
        loop
        muted={muted}
        paused={paused}
        onSceneChange={onSceneChange}
      />
      <div
        ref={sensorRef}
        className="control-sensor"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
      >
        <div className="control-sensor-filler" aria-hidden="true" />
        <ControlBar
          visible={barVisible}
          collapsed={collapsed}
          locked={locked}
          paused={paused}
          muted={muted}
          sceneKeys={sceneKeys}
          activeIndex={activeIndex}
          activeDuration={activeDuration}
          activeStartTime={activeStartTime}
          totalDuration={totalDuration}
          tick={tick}
          onTogglePause={togglePause}
          onToggleLock={toggleLock}
          onToggleMute={() => setMuted((value) => !value)}
          onJumpTo={handleJumpTo}
          onToggleCollapsed={handleToggleCollapsed}
        />
      </div>
    </div>
  );
}