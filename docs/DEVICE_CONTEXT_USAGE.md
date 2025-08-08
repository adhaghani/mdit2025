# Device Context Usage Guide

The Device Context provides efficient device detection and performance optimization without re-running expensive checks on every render.

## Setup

The `DeviceProvider` is already configured in the root layout, so all components have access to device information.

## Basic Usage

### Using the main hook

```tsx
import { useDevice } from "@/contexts/device-context";

function MyComponent() {
  const {
    isWebGLSupported,
    shouldReducePerformance,
    isLowEndDevice,
    isLoading,
  } = useDevice();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isWebGLSupported ? <ExpensiveWebGLComponent /> : <FallbackComponent />}
    </div>
  );
}
```

### Using convenience hooks

```tsx
import {
  useIsWebGLSupported,
  useIsLowEndDevice,
} from "@/contexts/device-context";

function MyComponent() {
  const { isWebGLSupported, isLoading } = useIsWebGLSupported();
  const { isLowEndDevice } = useIsLowEndDevice();

  return (
    <div>
      {!isLoading && isWebGLSupported && <HighPerformanceComponent />}
      {isLowEndDevice && <LowEndOptimizedComponent />}
    </div>
  );
}
```

### Using the performance rendering hook

```tsx
import { usePerformanceRendering } from "@/contexts/device-context";

function MyComponent() {
  const {
    canRenderWebGL,
    canRenderHighPerformance,
    shouldUseFallback,
    isLoading,
  } = usePerformanceRendering();

  if (isLoading) {
    return <ComponentSkeleton />;
  }

  return (
    <div>
      {canRenderWebGL && <WebGLComponent />}
      {canRenderHighPerformance && <HighPerformanceAnimation />}
      {shouldUseFallback && <StaticFallback />}
    </div>
  );
}
```

## Available Properties

### DeviceInfo Properties

- `isMobile`: Boolean indicating if device is mobile
- `isAndroid`: Boolean indicating if device is Android
- `isIOS`: Boolean indicating if device is iOS
- `isLowEndDevice`: Boolean indicating if device has limited resources
- `hasReducedMotion`: Boolean indicating user prefers reduced motion
- `supportsWebGL`: Boolean indicating WebGL support
- `memoryInfo`: Object with memory usage data (Chrome only)

### Computed Properties

- `isWebGLSupported`: Safe to use WebGL (considers device capabilities and user preferences)
- `shouldReducePerformance`: Should use performance-optimized rendering
- `shouldDisableWebGL`: Should avoid WebGL completely
- `isVeryLowEndDevice`: Enhanced low-end device detection

### Utility Properties

- `isLoading`: Boolean indicating if device detection is still running

## Migration from Direct Function Calls

### Before (causes hydration issues)

```tsx
import { isWebGLSupported, shouldReducePerformance } from "@/lib/device-utils";

function MyComponent() {
  // This causes hydration mismatch!
  return (
    <div>
      {isWebGLSupported() && <WebGLComponent />}
      {shouldReducePerformance() && <FallbackComponent />}
    </div>
  );
}
```

### After (hydration safe)

```tsx
import { useDevice } from "@/contexts/device-context";

function MyComponent() {
  const { isWebGLSupported, shouldReducePerformance, isLoading } = useDevice();

  // Wait for device detection to complete
  if (isLoading) return <Skeleton />;

  return (
    <div>
      {isWebGLSupported && <WebGLComponent />}
      {shouldReducePerformance && <FallbackComponent />}
    </div>
  );
}
```

## Best Practices

1. **Always check `isLoading`**: Device detection runs async, so always handle the loading state
2. **Use convenience hooks**: For single checks, use specific hooks like `useIsWebGLSupported()`
3. **Cache expensive components**: Use `React.memo()` for components that depend on device info
4. **Progressive enhancement**: Default to safe/fallback rendering while loading

## Example: Conditional Background Components

```tsx
import { usePerformanceRendering } from "@/contexts/device-context";

function BackgroundEffects() {
  const { canRenderWebGL, shouldUseFallback, isLoading } =
    usePerformanceRendering();

  // Show nothing while detecting device capabilities
  if (isLoading) return null;

  return (
    <>
      {canRenderWebGL && (
        <div className="absolute inset-0">
          <WebGLAuroraEffect />
        </div>
      )}

      {shouldUseFallback && (
        <div className="absolute inset-0">
          <StaticGradientBackground />
        </div>
      )}
    </>
  );
}
```

This approach eliminates hydration mismatches and provides better performance by avoiding repeated device detection calls.
