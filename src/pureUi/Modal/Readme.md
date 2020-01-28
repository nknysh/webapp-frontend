# Modals

## Basic Usage

```.ts
import {StandardModal,ModalHeader, ModalContent, ModalFooter } from 'pureUi/modal';

<StandardModal onClose={() => {...}}>
  <ModalHeader>
    <Heading1>My Modal Header</Heading1>
  </ModalHeader>
  <ModalContent>
    { ...your modal content }
  </ModalContent>
  <ModalFooter>
    <button>OK</button>
  </ModalFooter>
</StandardModal>
```

This will render several components:

- ModalViewWrapper
- ModalFrame
- ModalCloseButton
- FocusTrap

Additionally, this will be rendered into a will render a modal view into a [react portal](https://reactjs.org/docs/portals.html).
Portals help us place UI "above" other elements wiithout litteering the code base with
arbitrary z-indexes with non-sensical values.

## Modal Components

### ModalWrapper

**Props: HTMLDivElement**

Ostensibly, the modal view background. A Plain div that fills the entire screen, with an opaque background color. This
component center aligns it's children hotrizontally and vertically.

### ModalFrame

**Props: HTMLDivElement**

Renders the container div that houses modal view content. The div has intrinsic sizing, meaning it will shrink/grow according
to it's contents. It has a max height/width of `80vh`/`90vw` accordingly,ensuring it will never exceed the viewport
bounds.

### ModalHeader

**Props: extends HTMLDivElement**

Additional Props

- noLogo: boolean - When true, does not render the PureEsacpes logo mark.

Renders a container div for your modal views header. By default, it renders a PureEscapes logo mark.

### ModalContent

**Props: HTMLDivElement**

Renders a container div for your main modal view content. The container has intrinsic sizing, and will
grow/shrink to accomodate it's content, but will switch to a scroll view to ensure the ModalFrame does
exceed the viewport bounds.

### ModalViewFooter

**Props: HTMLDivElement**

Renders a container div for your main modal view's footer content.

### ModalViewCloseButton

**Props: HTMLButtonElement**

A simple wrapper, renders an `<IconButton>` with a `<CloseIcon>` child,absolutely positioned.

If you construct your own Modal view component, instead of using `<StandardModal>`, it is reccomended
to make `<ModalViewCloseButton>` the last child. This ensures the close button does not steal focus.

## Third Party Dependencies

### FocusTrap

This compoenent simply 'traps' focus to it's children, allowing the user to tab through UI elements without
leaving the Modal context and shifting focus to the underlying UI.

### Z-Indexes

Z-indexes are confusuing, and often misunderstood. Their behaviour is a manifestation of z-index values,
dom hierarchy, and positioninig. Setting high z-indexes is a hack that is not guaranteed to work, and
will just create a headache for future developers.

Unfortunatly, at the time of writing, the UI code is riddled with arbitrary and uncesessary high z-indexes.
This means Portals alone aren't enough to guarantee a component renders above all other UI. If you encounter
a scenario where a rouge z-index is causing issues, we'll have to fix it.

In general, z-indexes should be avoided. When they are absolutely necessary, there's rarely any need to set
a z-index greater than 1.
