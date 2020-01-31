# DimensionsProvider

A render prop component that provides it's child's size metrics of to the render function. Use this component when you need to inform child components of some ancestors size, position, and viewport dimensions.

## Basic Usage

A common use case for this is in combination with portals. Since portals render their contents into a new render tree, you may need to manually set the portal content's positon to align with some other UI element. You can use the AutoPositon component to simplify this task.

```
<DimensionsProvider display="inline" render={(ancestorDimensions, viewportDimensions) => {
  <ElementWithDimensions>
    <div>
      {someBool && renderPortal((
        <AutoPositon ancestorDimensions={ancestorDimensions} viewportDimensions={viewportDimensions}>
          <OverlayContent />
        </AutoPositon>
      ), PortalType.Overlay)}
    </div>
  <ElementWithDimensions>
}}>
```
