/**
 * SIMPLE DEVICE DETECTION USAGE GUIDE
 *
 * This file shows different ways to use the isLowEndDevice() function
 */

import { isLowEndDevice, isVeryLowEndDevice } from "@/lib/device-utils";
import {
  useDeviceDetection,
  useIsLowEndDevice,
} from "@/hooks/useDeviceDetection";

// ============================================================================
// METHOD 1: Direct function call (simplest)
// ============================================================================

export function ExampleDirectUsage() {
  const handleClick = () => {
    if (isLowEndDevice()) {
      console.log("Device is low-end - use reduced performance");
      // Show simplified UI or disable heavy animations
    } else {
      console.log("Device is high-end - use full performance");
      // Show full UI with all animations
    }
  };

  return <button onClick={handleClick}>Check Device Performance</button>;
}

// ============================================================================
// METHOD 2: Using React Hook (recommended for components)
// ============================================================================

export function ExampleHookUsage() {
  const isLowEnd = useIsLowEndDevice();

  return (
    <div>
      {isLowEnd ? (
        <div>Low-end device: Showing simplified UI</div>
      ) : (
        <div>High-end device: Showing full UI with animations</div>
      )}
    </div>
  );
}

// ============================================================================
// METHOD 3: Enhanced detection with more options
// ============================================================================

export function ExampleEnhancedUsage() {
  const { isLowEnd, isVeryLowEnd, isClient } = useDeviceDetection();

  // Prevent hydration mismatch
  if (!isClient) {
    return <div>Loading...</div>;
  }

  if (isVeryLowEnd) {
    return <div>Very basic UI for very low-end devices</div>;
  }

  if (isLowEnd) {
    return <div>Simplified UI for low-end devices</div>;
  }

  return <div>Full-featured UI for high-end devices</div>;
}

// ============================================================================
// METHOD 4: Conditional component rendering
// ============================================================================

export function ExampleConditionalRendering() {
  return (
    <div>
      {/* Only show heavy animations on high-end devices */}
      {!isLowEndDevice() && <HeavyAnimationComponent />}

      {/* Always show basic content */}
      <BasicContent />

      {/* Show different versions based on device capability */}
      {isVeryLowEndDevice() ? (
        <MinimalComponent />
      ) : isLowEndDevice() ? (
        <SimplifiedComponent />
      ) : (
        <FullFeaturedComponent />
      )}
    </div>
  );
}

// Placeholder components for the example
function HeavyAnimationComponent() {
  return <div>Heavy Animation</div>;
}
function BasicContent() {
  return <div>Basic Content</div>;
}
function MinimalComponent() {
  return <div>Minimal</div>;
}
function SimplifiedComponent() {
  return <div>Simplified</div>;
}
function FullFeaturedComponent() {
  return <div>Full Featured</div>;
}

// ============================================================================
// USAGE EXAMPLES IN REAL SCENARIOS
// ============================================================================

// Example 1: Disable WebGL animations on low-end devices
export function WebGLExample() {
  return (
    <div>
      {isLowEndDevice() ? (
        <div className="bg-gradient-to-r from-blue-500 to-purple-500">
          Static gradient background
        </div>
      ) : (
        <canvas>WebGL Animation</canvas>
      )}
    </div>
  );
}

// Example 2: Reduce image quality on low-end devices
export function ImageExample() {
  const quality = isLowEndDevice() ? 50 : 100;
  const size = isLowEndDevice() ? "small" : "large";

  return (
    <img
      src={`/image-${size}.jpg?quality=${quality}`}
      alt="Optimized for device capability"
    />
  );
}

// Example 3: Conditional lazy loading
export function LazyLoadingExample() {
  const shouldLazyLoad = isLowEndDevice();

  return (
    <img
      src="/image.jpg"
      loading={shouldLazyLoad ? "lazy" : "eager"}
      alt="Conditionally lazy loaded"
    />
  );
}
