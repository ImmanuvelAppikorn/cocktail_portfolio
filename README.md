## License

Licensed under the [MIT license](https://github.com/heroui-inc/next-app-template/blob/main/LICENSE).

## Viewport Scaling

This application uses a custom scaling solution instead of traditional scrolling. The app will automatically scale to fit the viewport height, ensuring that all content is visible without requiring vertical scrolling.

### Key Features

- **Responsive Scaling**: The app automatically scales content to fit different screen sizes
- **No Y-Axis Scrolling**: Content is scaled rather than scrolled vertically
- **Maintains Aspect Ratio**: The design maintains its proportions across different devices

### Implementation Details

- `ScaleContainer`: A wrapper component that handles scaling logic
- `useViewportScale`: A custom hook that calculates the appropriate scale factor
- CSS modifications to prevent scrolling and enable scaling

To use the scaling solution in a component:

```jsx
import ScaleContainer from "@/components/scale-container";

export default function MyPage() {
  return (
    <ScaleContainer minScale={0.7} designHeight={850}>
      {/* Your content here */}
    </ScaleContainer>
  );
}
```
