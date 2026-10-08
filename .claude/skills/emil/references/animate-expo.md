# expo mode - animation in React Native and Expo

Shared rules (frequency gate, purpose, easing and duration tables, springs, physicality, interruptibility, performance, accessibility, the never-ship table, the Before / After review format) live in SKILL.md section 2 and 3. This file adds only what is specific to this mode. Pull exact values from SKILL.md, never approximate.

Mobile changes three things: there is no hover; there are two runtimes (RN and UI, keep motion on the UI runtime); the finger is on the element, so interruptibility and velocity handoff are the baseline. Reanimated 4 + Worklets, Gesture Handler, Expo Router, expo-haptics. Feel is judged on a release build on the slowest supported device.

---

### Operating Posture

You are a senior mobile engineer building the animation yourself. Make the call, state the reasoning in one line, write the code. Never present motion options as a menu.

Two failure modes, and the first is worse:

1. **Animating something that shouldn't animate.** The gate below exists to produce zero lines of code sometimes.
2. **Animating the right thing on the wrong thread** — a `setState` per frame, a `PanResponder`, an animated `height`. It looks fine in dev on your phone and drops to 20fps on a three-year-old Android.

### Hard Rules

1. **Run the sequence in order.** Steps 1 and 2 gate everything.
2. **Reanimated, not core `Animated`.** Core `Animated` can't be driven by a gesture without crossing the bridge, and `useNativeDriver` refuses anything but transform and opacity anyway. Reanimated worklets run on the UI thread and keep running while JS is busy.
3. **No approximated values.** Curves and spring configs come from the tables below.
4. **Reduced motion ships with the animation**, not as a follow-up.
5. **Feel is judged on a release build on the slowest device you support.** Nothing else counts as verified.

### The Build Sequence

#### 1. Should this animate at all?

| Frequency | Decision |
| --- | --- |
| 100+ times/day — tab switches, keyboard open/close, scrolling, toggles in settings | **No animation.** Platform default or nothing. Stop here. |
| Tens of times/day — press feedback, list navigation, row selection | Near-imperceptible only: under 150ms, or nothing |
| Occasional — sheets, modals, toasts, onboarding steps | Standard animation |
| Rare / first-time — success states, empty-state illustrations, celebration | The delight budget lives here |

**Tab switches never slide.** Tabs are peers, not a hierarchy — sliding implies depth that isn't there, and the user pays for it dozens of times a session. `animation: 'none'`.

If the request fails this gate, say so and don't write it.

#### 2. What is the purpose?

Name it in one word before continuing: **feedback**, **spatial consistency**, **state indication**, **preventing a jarring change**, **explanation**, or **delight** (rare tier only).

Can't name it? Don't build it.

#### 3. Pick the tool — cheapest that works

Walk down; stop at the first that fits.

| Need | Tool |
| --- | --- |
| A state-driven change with no gesture — press, toggle, color, a value flipping | **Reanimated CSS transition** (`transitionProperty` in the style) |
| Loop, multi-stage, or plays on mount with no state change | **Reanimated CSS animation** (`animationName` keyframes) |
| An element mounting or unmounting, or a list reflowing | **Layout animations** (`entering` / `exiting` / `itemLayoutAnimation`) |
| Anything a finger touches, or anything derived from scroll | **`useSharedValue` + `Gesture` + `useAnimatedStyle`** |
| Screen to screen | **Native stack options in Expo Router.** Never hand-roll this |
| A bottom sheet that is its own screen | **`presentation: 'formSheet'`** — it's a real UISheetPresentationController, free and correct |
| Tab bar | **`NativeTabs`** (from `expo-router/unstable-native-tabs`) — the platform's real tab bar, its behaviors and transitions included |
| Context menu, press-and-hold preview | **`Link.Menu` / `Link.Preview`** (Expo Router, iOS-only) — native menus and peek, never rebuilt in JS |
| Header that collapses into a large title | **`headerLargeTitleEnabled`** on the native stack (iOS-only; `headerLargeTitle` is deprecated) — not a scroll worklet |
| Pull to refresh | **`RefreshControl`** — hand-roll only when it's a signature interaction (see the threshold recipe) |
| UI that tracks the keyboard | **`react-native-keyboard-controller`** — the keyboard's real position, frame by frame, on the UI thread |
| Vector illustration, celebration, empty state | **Lottie** — for illustration only, never for UI state |
| A huge animated scene, freeform drawing | **`@shopify/react-native-skia`** — a canvas, for when the view hierarchy itself is the bottleneck |

Reach for a shared value only when the value is continuous or interruptible. A press scale is a CSS transition; a drag is a shared value. Using a worklet for a two-state toggle is the mobile equivalent of installing a motion library for a fade.

**Dependencies.** Install with `npx expo install <package>` — it resolves the version that matches the project's SDK, which plain `npm install` won't:

| Need | Package |
| --- | --- |
| Animation | `react-native-reanimated` + `react-native-worklets` |
| Gestures | `react-native-gesture-handler` |
| Navigation, sheets, native tabs, menus | `expo-router` |
| Haptics | `expo-haptics` |
| Keyboard-following UI | `react-native-keyboard-controller` (needs `KeyboardProvider` at the root — see the keyboard recipe) |
| Illustration, celebration | `lottie-react-native` |
| Very large animated scenes, custom drawing | `@shopify/react-native-skia` |

#### 4. Pick the properties

- **`transform` and `opacity` are free.** Everything else is a layout pass. `width`, `height`, `margin`, `padding`, `flex`, `top`, `left`, `gap` re-run Yoga on every frame for that node *and its siblings*.
- **The one exception: an absolutely positioned element with no children** — a tab pill, a progress bar fill. It's out of flow, so nothing else re-lays-out, and animating `width` keeps the corner radius that `scaleX` would smear.
- **Never `scale(0)`.** Start from `scale(0.9–0.97)` + `opacity: 0`. Nothing in the real world appears from nothing.
- **`transform` is an array and order matters** — `[{ translateY }, { scale }]` scales after moving; reversed, the translate gets scaled too. Keep translate first unless you want the multiplication.
- **Android shadows are `elevation`, and animating elevation re-renders the shadow every frame.** Animate opacity of a pre-shadowed layer instead.
- **Never animate `BlurView` intensity.** On Android it re-renders the blur each frame. Crossfade the opacity of a static `BlurView` instead.
- **Percentages work in `translate`** and are relative to the element's own size — `translateY('100%')` moves a sheet by its own height whatever its content.

#### 5. Timing or spring

**If a finger was involved, use a spring.** Springs carry velocity through an interruption; timing curves restart. Everything else uses timing.

Reanimated's spring takes Apple's two designer parameters directly — use this form, not mass/stiffness/damping:

| Interaction | Config |
| --- | --- |
| Default settle, no overshoot | `{ duration: 400, dampingRatio: 1 }` |
| Reposition / snap back after a drag | `{ duration: 400, dampingRatio: 0.8, velocity }` |
| Sheet, drawer | `{ duration: 300, dampingRatio: 0.8, velocity }` |
| Must not pass a hard edge | add `overshootClamping: true` |

**Bounce only when the gesture carried momentum.** Overshoot on a menu that faded in feels wrong; overshoot on a card you flicked feels right.

**Easing**, for everything without a finger on it:

| Situation | Easing |
| --- | --- |
| Entering or exiting | `ease-out` |
| Moving / morphing on screen | `ease-in-out` |
| Constant motion (progress, marquee) | `linear` |
| Default | `ease-out` |

**Never `ease-in` on UI.** It starts slow, delaying the exact moment the user is watching. Reanimated's built-ins are as weak as CSS's — use these:

```js
import { Easing } from 'react-native-reanimated';

const EASE_OUT = Easing.bezier(0.23, 1, 0.32, 1);      // strong ease-out for UI
const EASE_IN_OUT = Easing.bezier(0.77, 0, 0.175, 1);  // on-screen movement
const EASE_SHEET = Easing.bezier(0.32, 0.72, 0, 1);    // iOS sheet curve
```

**Duration:**

| Element | Duration |
| --- | --- |
| Press feedback | 100–150ms |
| Toggle, chip, small state change | 150–200ms |
| Sheet, modal, drawer | spring, ~300ms perceived |
| Screen transition | the platform default — don't override it |

Mobile UI animations stay under 300ms, same as web. The platform's own transitions are longer (iOS push is 350ms); match the platform for navigation, beat it everywhere else.

#### 6. Keep it off the JS thread

This is the mobile-specific craft, and it's where most React Native motion dies.

- **Never `setState` from a gesture or scroll handler.** One React render per frame is the single biggest cause of jank in RN apps. Shared value → `useAnimatedStyle`, and React never re-renders at all.
- **Never schedule back to the RN runtime inside `onUpdate` or a scroll handler.** `scheduleOnRN(fn, ...args)` from `react-native-worklets` — the Reanimated 4 replacement for the deprecated `runOnJS(fn)(...args)` — queues an RN-runtime call, and in `onUpdate` that's 60–120× per second. It belongs in `onEnd`, or in a `useAnimatedReaction` that fires when a value crosses a threshold.
- **Never read a shared value during render** (`translateY.get()` in JSX). It's a snapshot that never updates and it silently desyncs. **Never write one during render either** — it fires mid-reconciliation, and a re-render you didn't cause replays the write. Touch shared values only in worklets, handlers, and effects.
- **Use `.get()` / `.set()`, not `.value`.** Same API, but direct `.value` access is the form the React Compiler can't see through — the Reanimated docs call `get`/`set` the compiler-safe way. `set` also takes a functional update: `sv.set((v) => v + 1)`.
- **Functions called from a worklet need `'worklet'`** as their first line, or they throw at runtime on device while working fine in the debugger.

#### 7. Press, not hover

Every hover affordance from the web has to be redesigned, not ported.

- **Feedback on press-in, commit on press-out.** Waiting for the tap to complete before showing anything feels dead — this is the latency the user actually perceives.
- **`scale: 0.97` in 100–150ms** on any pressable, `Pressable` + a CSS transition. `scale` takes the label and icons with it, which is what makes it read as physical.
- **44×44pt minimum touch target** (48dp Android). If the visual is smaller, add `hitSlop` — don't grow the visual.
- **`pressRetentionOffset`** so a finger drifting a few pixels doesn't cancel a press the user meant.
- **Android ripple only in a Material-styled app.** In a custom-designed app, the same scale on both platforms is more coherent than a ripple on one.

#### 8. Haptics

Mobile has a sense the web doesn't. Use it sparingly and it becomes the thing that makes the app feel expensive; use it everywhere and users turn it off.

| Moment | Call |
| --- | --- |
| A value ticks past a step — picker, slider detent, segmented control | `Haptics.selectionAsync()` |
| Something snaps home, a sheet detent catches, a drag commits | `Haptics.impactAsync(ImpactFeedbackStyle.Light)` |
| A heavy object lands, a destructive action fires | `Haptics.impactAsync(ImpactFeedbackStyle.Medium)` |
| Operation succeeded or failed | `Haptics.notificationAsync(NotificationFeedbackType.Success / Error)` |

Three rules, and they're absolute:

- **Same frame as the visual.** A haptic that lags its animation reads as a glitch, not as feedback. Fire it at the causal moment — the detent catching — not when the animation finishes.
- **One per user action.** Never on scroll, never per frame, never on an entrance animation the user didn't cause.
- **Never the only feedback.** Haptics are off system-wide for many users, and silent on most Android hardware. The visual has to stand alone.

From a worklet, haptics must be scheduled back to the RN runtime: `scheduleOnRN(Haptics.selectionAsync)`.

#### 9. Reduced motion and accessibility

```jsx
import { useReducedMotion, ReduceMotion, withSpring } from 'react-native-reanimated';

const reduced = useReducedMotion();
const y = useSharedValue(reduced ? 0 : SHEET_HEIGHT);

// or let each animation decide
withSpring(0, { duration: 300, dampingRatio: 0.8, reduceMotion: ReduceMotion.System });
```

Reduced motion means **fewer and gentler**, not zero: keep opacity and color changes that explain a state change, drop translation, scale, parallax and overshoot. Screen transitions become `animation: 'fade'`.

**Text scales.** `allowFontScaling` is on by default, so any height you measured at default type size is wrong at 200%. Never animate to a hardcoded height — measure with `onLayout`, or animate a transform instead.

### Setup that silently breaks motion

Check these first when "the animation just doesn't run":

- Install through Expo so versions match the SDK: `npx expo install react-native-reanimated react-native-worklets`. In an Expo project, `babel-preset-expo` configures the worklets Babel plugin automatically — no `babel.config.js` step. Only a bare RN project without that preset adds the plugin manually, and there it must be last in the list. A missing or misplaced plugin doesn't silently fall back anymore — it throws `Failed to create a worklet` at runtime.
- `GestureHandlerRootView` must wrap the app, or gestures do nothing with no error.
- Reanimated 4 requires the New Architecture.
- **Expo Go is not a performance environment.** Judge feel in a release build; a dev build's JS thread is slow enough to hide exactly the problems you're looking for.

### 120fps

On ProMotion iPhones, third-party animations are capped at 60fps unless `CADisableMinimumFrameDurationOnPhone` is set. Recent Expo SDKs set it by default — confirm it's there, and add it if not:

```json
{ "expo": { "ios": { "infoPlist": { "CADisableMinimumFrameDurationOnPhone": true } } } }
```

Then the frame budget is 8ms, not 16. This is also why a UI-thread animation matters more on mobile than it does on web.

### Recipes

For ready-to-build implementations — press feedback, drag-to-dismiss sheet, swipe-to-delete, collapsing header, list entrances, keyboard-synced UI, tab indicator, screen transitions — see [RECIPES.md](RECIPES.md). Load it whenever the request matches one; start from the recipe rather than from a blank file.

### Never Ship

| Never | Instead |
| --- | --- |
| `PanResponder` | `Gesture.Pan()` from gesture-handler |
| `setState` in a gesture or scroll handler | shared value + `useAnimatedStyle` |
| `runOnJS` (deprecated in Reanimated 4) | `scheduleOnRN` from `react-native-worklets` |
| `scheduleOnRN` per frame | `onEnd`, or `useAnimatedReaction` at a threshold |
| Reading or writing a shared value during render | `.get()` / `.set()` in worklets, handlers, effects |
| Core `Animated` for anything a finger touches | Reanimated |
| Animating `height` / `width` / `margin` / `flex` / `top` | `transform` + `opacity` (absolute, childless elements exempt) |
| Animating `BlurView` intensity or Android `elevation` | crossfade a static layer |
| `entering` on a virtualized list row | animate the container, or `itemLayoutAnimation` |
| A screen transition rebuilt in JS | native stack `animation` |
| Sliding between tabs | `animation: 'none'` |
| `Easing.in(...)` on a UI element | `Easing.bezier(0.23, 1, 0.32, 1)` |
| `scale(0)` entrance | `scale(0.95)` + `opacity: 0` |
| Distance-only dismissal threshold | velocity **or** distance — a flick is enough |
| Hard stop at a boundary | rubber-band resistance |
| A haptic per frame, or as the only feedback | one per commit, always paired with a visual |
| Judging feel in Expo Go or the simulator | release build, slowest supported device |

### Output

Write the code. Then, in at most a few lines:

- **The gate result** — frequency tier and named purpose. Say what you rejected and why.
- **The ingredients** — tool, properties, spring or curve + duration, thread.
- **What to feel-check on device** — gestures, velocity handoff and haptic timing cannot be judged from code. Name what to try: flick it, interrupt it mid-flight, reverse it, run it on the slowest Android you have.

The code is the deliverable. Don't pad it into a report.

### Tone

Opinionated and brief. When the honest answer is "this shouldn't animate," or "this needs a real device before I can tell you if it's right," give it.

---

# Recipes

Ready-to-build implementations for the cases that come up most in a React Native app. Start from the recipe, then adapt.

---

### Setup the recipes assume

```bash
npx expo install react-native-reanimated react-native-worklets react-native-gesture-handler expo-haptics
```

(`react-native-keyboard-controller` only for the keyboard recipe.) `expo install`, not `npm install` — it resolves the versions that match the SDK. The worklets Babel plugin is configured by `babel-preset-expo` automatically.

`GestureHandlerRootView` wraps the app once — in Expo Router, the root `_layout`:

```jsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack />
    </GestureHandlerRootView>
  );
}
```

Imports and constants every recipe below shares:

```js
import { useState, useEffect, useMemo } from 'react';
import Animated, {
  useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, useAnimatedReaction,
  withSpring, withTiming, interpolate, Extrapolation, Easing,
  FadeInDown, FadeOutDown, LinearTransition,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { scheduleOnRN } from 'react-native-worklets';
import * as Haptics from 'expo-haptics';

const EASE_OUT = Easing.bezier(0.23, 1, 0.32, 1);      // strong ease-out for UI
const EASE_IN_OUT = Easing.bezier(0.77, 0, 0.175, 1);  // on-screen movement
const EASE_SHEET = Easing.bezier(0.32, 0.72, 0, 1);    // iOS sheet curve
```

Three conventions, explained once here instead of in every recipe:

- **Shared values are read and written with `.get()` / `.set()`**, the form the Reanimated docs recommend for React Compiler support. `.value` still works, but the compiler can't see through it.
- **`scheduleOnRN(fn, ...args)` replaces the deprecated `runOnJS(fn)(...args)`** for calling back to the React Native runtime from a worklet.
- **Gestures are wrapped in `useMemo`.** Rebuilding a gesture on every render can reattach the recognizer and drop a drag that's mid-flight.

**Gesture Handler v3:** Expo installs v2, and the recipes use its `Gesture.Pan()` builder. If the project is already on v3, the builder is legacy — each gesture is a hook taking one config object, with `onStart` → `onActivate`, `onEnd` → `onDeactivate`, and the `success` flag replaced by `event.canceled` (inverted). The hook manages its own identity, so drop the `useMemo`:

```jsx
const pan = usePanGesture({
  activeOffsetY: [-10, 10],
  onActivate: () => { context.set(translateY.get()); },
  onUpdate: (e) => { translateY.set(context.get() + e.translationY); },
  onDeactivate: (e) => { /* settle with withSpring as below */ },
});
```

---

### Two worklets you'll need everywhere

Momentum projection decides *where a flick was going*, so a fast short swipe commits and a slow long one doesn't. Rubber-banding makes a boundary resist instead of stopping dead.

```js
// Where the finger would come to rest if it kept decelerating.
// Apple's exponential-decay form — not the v²/2a from physics class.
function project(velocity, decelerationRate = 0.998) {
  'worklet';
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

// The further past the edge, the less the element follows.
function rubberband(overshoot, dimension, constant = 0.55) {
  'worklet';
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}
```

---

### Press feedback

Every pressable in the app. This passes the frequency gate only because it's near-imperceptible: 120ms and a 3% scale is the ceiling for something touched this often — anything longer or larger belongs to rarer moments, per step 1 in SKILL.md. No gesture, no shared value — a CSS transition is the whole implementation.

```jsx
import Animated from 'react-native-reanimated';
import { Pressable, StyleSheet } from 'react-native';

function PressableScale({ onPress, children }) {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      hitSlop={12}
      pressRetentionOffset={16}
    >
      <Animated.View style={[styles.box, pressed && styles.pressed]}>{children}</Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    transform: [{ scale: 1 }],
    transitionProperty: 'transform',
    transitionDuration: '120ms',
    transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
  },
  pressed: { transform: [{ scale: 0.97 }] },
});
```

`setState` is fine here — it fires twice per press, not per frame. `hitSlop` brings a small icon up to the 44pt target without growing it; `pressRetentionOffset` stops a slight finger drift from cancelling.

---

### Bottom sheet you can drag to dismiss

Before writing this: if the sheet is its own destination, use `presentation: 'formSheet'` (see **Screen transitions**) and get the platform's real sheet for free. Build this only when the sheet has to live inside an existing screen.

```jsx
const translateY = useSharedValue(0);
const context = useSharedValue(0);

const pan = useMemo(() => Gesture.Pan()
  .activeOffsetY([-10, 10])   // let a horizontal swipe win; require intent before committing
  .onStart(() => {
    context.set(translateY.get());   // start from the current on-screen value, not from 0
  })
  .onUpdate((e) => {
    const next = context.get() + e.translationY;
    // downward is free; upward past the top resists
    translateY.set(next >= 0 ? next : rubberband(next, HEIGHT));
  })
  .onEnd((e) => {
    const projected = translateY.get() + project(e.velocityY);
    if (projected > HEIGHT * 0.4) {
      translateY.set(withSpring(HEIGHT, {
        duration: 300, dampingRatio: 1, velocity: e.velocityY, overshootClamping: true,
      }, (finished) => { if (finished) scheduleOnRN(onClose); }));
    } else {
      translateY.set(withSpring(0, { duration: 300, dampingRatio: 0.8, velocity: e.velocityY }));
      scheduleOnRN(Haptics.impactAsync, Haptics.ImpactFeedbackStyle.Light);   // it snapped home
    }
  }), [onClose]);

const sheetStyle = useAnimatedStyle(() => ({ transform: [{ translateY: translateY.get() }] }));
```

The four details that separate this from a bad drag:

- **`onStart` captures the current value.** Without it, grabbing a sheet mid-animation teleports it — the animation must continue from where the eye last saw it.
- **Velocity decides, not distance.** `project()` means a quick flick dismisses even a few pixels down. Requiring 40% travel makes the sheet feel heavy.
- **Velocity is handed to the spring**, so there's no seam between the finger releasing and the animation continuing. This is the single detail that most separates "fluid" from "fine".
- **`overshootClamping` on dismissal** — otherwise the sheet springs past the bottom of the screen and flashes a gap.

The backdrop derives from the same value, so it's always in sync and costs nothing:

```jsx
const backdropStyle = useAnimatedStyle(() => ({
  opacity: interpolate(translateY.get(), [0, HEIGHT], [1, 0], Extrapolation.CLAMP),
}));
```

---

### Swipe to delete a row

Before writing this: gesture-handler ships [`ReanimatedSwipeable`](https://docs.swmansion.com/react-native-gesture-handler/docs/components/reanimated_swipeable/), which already does swipe-to-reveal actions — thresholds, overshoot, open/close methods — on the UI thread. Reach for it when the row reveals action buttons. Build the gesture yourself only when the interaction is different in kind: swipe-to-commit with momentum projection, like this one.

```jsx
const x = useSharedValue(0);
const context = useSharedValue(0);

const pan = useMemo(() => Gesture.Pan()
  .activeOffsetX([-10, 10])   // must declare the axis, or it fights the vertical scroll
  .onStart(() => { context.set(x.get()); })   // grab mid-spring continues from where the row is, not from 0
  .onUpdate((e) => { x.set(Math.min(0, context.get() + e.translationX)); })
  .onEnd((e) => {
    const projected = x.get() + project(e.velocityX);
    if (projected < -SWIPE_THRESHOLD) {
      x.set(withTiming(-WIDTH, { duration: 200, easing: EASE_OUT }, (f) => {
        if (f) scheduleOnRN(onDelete, id);
      }));
    } else {
      x.set(withSpring(0, { duration: 300, dampingRatio: 1, velocity: e.velocityX }));
    }
  }), [onDelete, id]);
```

Closing the gap the deleted row left is the list's job, not the row's:

```jsx
const ROW_CLOSE = LinearTransition.duration(200);   // module scope — builders rebuilt in render cost every re-render

<Animated.FlatList data={items} itemLayoutAnimation={ROW_CLOSE} ... />
```

`activeOffsetX` is the mobile-specific part. A pan handler inside a scroll view with no axis declared will steal vertical scrolls, and the list will feel broken in a way that looks like a scrolling bug rather than a gesture bug.

---

### Collapsing header on scroll

```jsx
const scrollY = useSharedValue(0);
const onScroll = useAnimatedScrollHandler((e) => { scrollY.set(e.contentOffset.y); });

const titleStyle = useAnimatedStyle(() => ({
  opacity: interpolate(scrollY.get(), [0, 60], [1, 0], Extrapolation.CLAMP),
  transform: [{ translateY: interpolate(scrollY.get(), [0, 60], [0, -12], Extrapolation.CLAMP) }],
}));

<Animated.ScrollView onScroll={onScroll} scrollEventThrottle={16}>
```

**Never animate the header's `height` to collapse it.** That runs a layout pass on the header and everything below it on every scroll frame — the one animation guaranteed to stutter, because it's competing with the scroll itself. Give the container a fixed height and translate the content inside it, clipping with `overflow: 'hidden'`.

`Extrapolation.CLAMP` is not optional: without it, scrolling past 60 keeps driving opacity negative and the header reappears inverted at the bottom of a long list.

---

### List entrances

```jsx
// The Reanimated docs recommend building layout animations outside components,
// or in useMemo — an inline chain in JSX rebuilds the builder on every render.
// A per-index delay can't live at module scope, so the row memoizes its own:
function Row({ item, index }) {
  const entering = useMemo(() => FadeInDown.duration(250).delay(index * 40), [index]);
  return <Animated.View entering={entering}>{/* ... */}</Animated.View>;
}

{items.map((item, i) => <Row key={item.id} item={item} index={i} />)}
```

Stagger 30–80ms. Longer feels slow, shorter reads as simultaneous.

**Never put `entering` on a row inside `FlatList`, `FlashList`, or any virtualized list.** Rows are recycled, so the animation re-fires every time one scrolls back into view — the list appears to flicker while the user scrolls. Animate the list container once on mount, or use `itemLayoutAnimation` for reflow only.

Entrance animations are for content the user asked for and is waiting on. A list they scroll past all day should already be there.

---

### Keyboard-synced UI

Needs its own module and a one-time provider ([Expo keyboard guide](https://docs.expo.dev/guides/keyboard-handling/)):

```bash
npx expo install react-native-keyboard-controller
```

```jsx
import { KeyboardProvider } from 'react-native-keyboard-controller';

// Root _layout, next to GestureHandlerRootView — hooks below do nothing without it.
<KeyboardProvider>
  <Stack />
</KeyboardProvider>
```

```jsx
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';

const { height } = useReanimatedKeyboardAnimation();   // 0 → -keyboardHeight, on the UI thread
const footerStyle = useAnimatedStyle(() => ({ transform: [{ translateY: height.get() }] }));
```

Never build this from `Keyboard.addListener` plus a timing animation. The keyboard rides a private system curve, the event arrives on the JS thread after the keyboard has already started moving, and any duration you pick will visibly lag or lead it. The UI must be driven by the keyboard's actual position, frame by frame.

---

### Tab / segmented indicator

Measure once, then animate transforms.

```jsx
const [layouts, setLayouts] = useState({});   // measured with onLayout, not per frame
const x = useSharedValue(0);
const w = useSharedValue(0);

useEffect(() => {
  const l = layouts[active];
  if (!l) return;
  x.set(withTiming(l.x, { duration: 250, easing: EASE_IN_OUT }));
  w.set(withTiming(l.width, { duration: 250, easing: EASE_IN_OUT }));
}, [active, layouts]);

const pillStyle = useAnimatedStyle(() => ({
  transform: [{ translateX: x.get() }],
  width: w.get(),
}));
```

This is the sanctioned `width` animation: the pill is absolutely positioned with no children, so nothing else re-lays-out, and its corner radius survives — `scaleX` would smear the corners into ovals.

`ease-in-out`, because the pill is moving across the screen rather than entering or leaving it. Fire `Haptics.selectionAsync()` on the press, not when the pill lands.

---

### Screen transitions (Expo Router)

Configure the native stack. Never rebuild a screen transition in JS: the native one runs on the platform side, keeps the interactive back gesture, and matches every other app on the device.

```jsx
<Stack screenOptions={{ animation: reduced ? 'fade' : 'default' }}>
  <Stack.Screen name="settings" options={{ animation: 'slide_from_right', animationMatchesGesture: true }} />
  <Stack.Screen name="compose" options={{ presentation: 'modal' }} />
  <Stack.Screen name="filter" options={{
    presentation: 'formSheet',
    sheetAllowedDetents: 'fitToContents',
    sheetGrabberVisible: true,
  }} />
</Stack>
```

| Navigation | Option |
| --- | --- |
| Deeper into a hierarchy | `animation: 'default'` — the platform push, unmodified |
| A self-contained task the user can abandon | `presentation: 'modal'` |
| A short interruption: picker, filter, share | `presentation: 'formSheet'` with detents |
| Between tabs | `animation: 'none'` |
| Reduced motion | `animation: 'fade'` |

`animationMatchesGesture: true` makes the iOS back swipe run your transition in reverse under the finger, instead of the default push. Set it whenever you set a custom `animation`, or dragging back looks like a different app than pushing forward.

`formSheet` is native on both platforms, but not the same on both — the [Expo modal docs](https://docs.expo.dev/router/advanced/modals/#form-sheet-presentation) have the full list:

- **Android caps detents at three.** A longer `sheetAllowedDetents` array works on iOS and silently truncates on Android — design for three.
- **`sheetGrabberVisible` is iOS-only.** Android shows no grabber; don't rely on it as the only "this is draggable" affordance.
- **Android form sheets can't host native headers or nested stacks.** Keep the sheet's content a single screen; if it needs its own navigation, use `presentation: 'modal'` instead.
- **`fitToContents` needs explicitly sized content.** A `flex: 1` root has no intrinsic height to fit — size the content, or the detent is wrong.

---

### Toast

```jsx
// Module scope — layout-animation builders live outside the component.
const TOAST_ENTER = FadeInDown.duration(300).easing(EASE_OUT);
const TOAST_EXIT = FadeOutDown.duration(250).easing(EASE_OUT);

<Animated.View
  entering={TOAST_ENTER}
  exiting={TOAST_EXIT}
  style={{ position: 'absolute', bottom: insets.bottom + 16, left: 16, right: 16 }}
/>
```

- **The 300ms cap holds here too.** A toast isn't an exception — it's uninvited, so if anything it should be quicker and quieter than motion the user asked for.
- **It exits the way it entered.** Entering from the bottom and leaving to the side reads as two unrelated elements.
- **Exit ~20% faster than entry.** The user has finished reading; the arrival deserves the time, the departure doesn't.
- **Safe area insets, always.** A toast at `bottom: 16` sits under the home indicator on every modern iPhone.

If toasts stack and the list reflows, add `itemLayoutAnimation` and expect to tune the opacity against the reflow by eye — there's no formula for that pair. Look at it again the next day.

---

### Firing something once at a threshold

When a crossing point matters — a detent, a snap, a pull-to-refresh arming — don't poll it from JS and don't `scheduleOnRN` every frame.

```jsx
const armed = useSharedValue(false);

useAnimatedReaction(
  () => pullDistance.get() > REFRESH_THRESHOLD,
  (isArmed, wasArmed) => {
    if (isArmed !== wasArmed) {
      armed.set(isArmed);
      scheduleOnRN(Haptics.impactAsync, Haptics.ImpactFeedbackStyle.Light);
    }
  }
);
```

The comparison runs on the UI thread every frame; the JS call happens twice per pull. That's the pattern for every "do something when the animation reaches X".
