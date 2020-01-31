# AutoPosition

Takes an `ancestorDimensions` and `viewportDimensions` prop and tries to re-position itself, and it's children, to ensure it's fully withing the bounds of the viewport. Useful in combination with `<DimensionsProvider />` and Portals.

When rendering content in a Portal, it is diconnected from it's parent DOM. In the case of overlays and dropdowns, you'll often want the Portal content to be visually anchored to the parent content. AutoPosition handles this logic for you.

## Known issues

Measuring elements as they are mounted is tricky, and steps must be taken to nudge the browser to update the bounding-box of an element. To do this, AutoPosition uses a setTimeout, and dispatched two fake scroll events to the browser (in a cross browser compatibe way). This means a scroll bar will appear whenever AutoPosition is mounted.

Sometimes, the user will see the child content rendered elsewhere on screen for a frame. I've not figured out the cause of this, or how to fix it.
