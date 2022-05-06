# The Public Interface of CardActor and CardPawn

## Introduction

A card in Croquet Microverse is represented with a class called CardActor on the Croquet's Model side, and CardPawn on the Croquet's View side.

An instance of CardActor and CardPawn can have a list of behaviors. Each of such behavior can use the features provided by the CardActor or CardPawn to which it is attached. For example, A CardActor implements a method called `createCard()`, which takes a card spec and creates a new card and place it in the world. A behavior can simply call:

```JavaScript
  this.createCard({...});
```

to invoke the feature of the CardActor. This document shows all public methods on CardActor and CardPawn that can be used from your behaviors.

Also, properties of CardActor or CardPawn can be read and written in a simple form:

```JavaScript
let a = this.foo;
```

or

```JavaScript
this.foo = 42;
```

Note that multiple behaviors installed to the same CardActor (or CardPawn) share the same property.

## CardActor Properties

Due to the naming scheme of Worldcore, the properties tend to be prefixed with an underscore "_". For example, the intrinsic property to denote the translation of the card is stored in `_translation`. A behavior can read out the value by `this._translation`. However, setting an intrinsic property directly `this._translation = [1, 2, 3]` itself typically does not have desired effects, as the view needs to be notified. Typically a setter method such as `setTranslation()` is used.

When Worldcore's `set()` method is used in this form:

```
this.set({translation: [1, 2, 3]});
```

The property `_translation` is updated and then an event with the property name with "Set" attached is published.

### `_translation`
`Array<number, number, number>`

The [x, y, z] translation of the card

### `_rotation`
`Array<number, number, number, number>`

The rotation of the card in quaternion.

### `_scale`
`Array<number, number, number>`

The scale of the card in three axies.

### `_layers`
`Array<string>`

Layers specifies how the card is treated when a special action is taken. Typical value are as follows:

* "walk": The avatar stays on the geometry of the card.
* "pointer": The pointer action is enabled.
* "portal": the avatar tests if the card it is going through needs to take the avatar to a connect world.

### `_parent`
The cards in the world are organized in a hierarchical parent-children structure. The `_parent` specifies its parent. Note that this is a "logical" structure. All cards are held as a direct child of the Three.JS scene, with automtic matrix composition for nested cards.

### `_behaviorModules`
`Array<string>`
The list of behavior modules installed to the card.

### `_multiuser`
`boolean`

The multi user flag that dictates that the event routing mechanism gives automatic lock to a particular view when the flag is false.

### `_name`
`string`

an informative string for the card.

### `_cardData`

Any other values that the CardActor holds are stored in an object stored in the `_cardData` property. This is needed to mark the values to be stored in the persistent data. 

## CardActor Methods

### `createCard(cardSpec:object):CardActor`

This method creates a new card (a CardActor on the model side and a CardPawn on the view side), according tbased on the `cardSpec`.

### `destroy()`

This method removes the card from the world. All `destroy()` method of installed pawn behaviors and actor behaviors are called before the CardActor is removed from the system.

### `call(behaviorName:string, methodName:string, ...values:Array<any>):any`

This method invokes a method of another behavior. The `behaviorName` has to be in one of the form of:

* *ModuleName*$*BehaviorName*
* *BehaviorName*

When the first form is used, it specifies the globally known module name and the behavior with the name on the actor side of the module.  When the second form is used, it specified the behavior in the same module as the calling behavior.

The `methodName` is the name of the method, and `values` are variable-length arguments for the method.

### `future(time:number)`

This method schedules a future call in the specified logical time in milliseconds. If it is used in this form:

```JavaScript
this.future(20).mth();
```

`mth` of the same behavior will be invoked 20 milliseconds from logical `now`. If you would like to call a method of another module or behavior, you can use `call()`:

```JavaScript
this.future(20).call("Module$Behavior", "mth");
```

### `setCardData(options:object)`

This method updates some elements in the `_cardData` object. The current value and the new values are merged to create the new `_cardData` object. As a side effect, it publishes `cardDataSet` Croquet event that can be handled by the pawn or any other subscribers.

### `addEventListener(eventName:EventName, listener:function|string)`
`type EventName = "pointerDown"|"pointerUp"|pointerMove"|"pointerTap"|"pointerLeave"|"pointerEnter"|"wheel"|"doubleDown"|"click"|"keyUp"|"keyDown"`

This method adds a "listener" to be invoked when an event occures on the card.  When `listener` is a function, it has to have a form of `this.mthName` where `mthName` is an existing method name of CardActor or the behavior itself. When listener is a string, it has to be the name of a method at CardActor or the behavior itself. The listener added by this Actor-side `addEventListener()` is invoked when any user in the world causes the corresponding user pointer or key event.

Calling this method with the same arguments removes the previous listener before adding the new one. This semantics ensures that dynamically-modified method will be used.

### `removeEventListener(eventName:EventName, listener:function|string)`
`type EventName = "pointerDown"|"pointerUp"|pointerMove"|"pointerTap"|"pointerLeave"|"pointerEnter"|"wheel"|"doubleDown"|"click"|"keyUp"|"keyDown"`

This method removes the event listener that was added. You can call it when there is no matching event listener.

### `subscribe(scope:string, eventName:string, listener:function|string)`

This method adds a Croquet event subscription. Unlike the version in the Croquet Library, this version removes the subscription with the same `scope` and `eventName` if it exists before adding the new one. This semantics ensures that it is safe to call this from the `setup()` of a behavior.

### `listen(eventName:string, listener:function|string)`

This method add a Croquet event subscription by calling the `subscribe()` method with `this.id` as the `scope`.

### `sayDeck(message:string, data:any)`

This method publishes a Croquet event in the scope of `this._parent.id` if `this._parent` is not undefined, or in `this.id` if it is undefined. Note that `this.parent` is resolved dynamically at the call time.

### `listenDeck(message:string, listener:function|string)`

This method subscribes a Croquet event in the scope of `this._parent.id` if `this._parent` is not undefined, or in `this.id` if it is undefined. Note that `this.parent` is resolved at the first time it is called, and any change to `this._parent` will not update the subscription.

### `addLayer(newLayerName:string)`

This method adds a new element to the `layers` array. If `newLayerName` is already in the `layers` array, the call does not have any effects.

### `removeLayer(layerName:string)`

This method removes an element from the `layers` array. If `layerName` is not in the `layers` array, the call does not have any effects.

### `setTranslation(v:Array<number, number, number>)`

This method moves the translation of the card to the specified `[x, y, z]` coordinates without smoothing.

### `setRotation(v:Array<number, number, number, number>)`

This method sets the translation of the card to the specified by a quaternion (`[x, y, z, w]`) without smoothing.

### `nop()`

This method is empty. It is used to have a way to get the tap to focus keyboard events but you don't need to take any particular action on tap.

## CardPawn Properties

The corresponding actor for a CardPawn is accessible by `this.actor`. You can read a value in `_cardData` simply by `this.actor._cardData.prop`. But note that a pawn should never modify the state of the actor.

The most important property of CardPawn is `shape`, which is a Three.JS `Group`, and the Micorverse system treats it as the primary visual representation of the card. Customizing the visual appearance of a card means to create a new Three.JS Object3D and add it to `shape`.

When the Card's type is "2d", and it has some `textureType`, the texture object is stored in `this.texture`.  If the `textureType is "canvas", the DOM canvas is stored in `this.canvas` so a pawn behavior can paint into the canvas.

## CardPawn Methods

### `call(behaviorName:string, methodName:string, ...values:Array<any>):any`

This method invokes a method of another behavior. The `behaviorName` has to be in one of the form of:

* "*ModuleName*$*BehaviorName*"
* "*BehaviorName*"

When the first form is used, it specifies the globally known module name and the behavior with the name on the actor side of the module.  When the second form is used, it specified the behavior in the same module as the calling behavior.

The `methodName` is the name of the method, and `values` are variable-length arguments for the method.

### `actorCall(behaviorName:string, methodName:string, ...values:Array<any>):any`

This method invokes a method on the corresponding actor. It is expected that the method to be invoked does not alter the state of the actor, but only reads a property or synthesizes a value from properties.

The `behaviorName` has to be a name of an actor behavior in the same module.

`actorCall()` is used as you cannot invoke an intended method by a simple invocation syntax:

```JavaScript
let foo = aPawn.actor.getFoo();
```

because the behavior that has `getFoo()` is not specified. If `getFoo()` is defined by an actor behavior with the name `FooActor`, you can call it by

```JavaScript
let foo = aPawn.actorCall("FooActor", "getFoo");
```

### `future(time:number)`

This method schedules a future call in roughly the specified wall time in milliseconds. If it is used in this form:

```JavaScript
this.future(20).mth();
```

`mth` of the same behavior will be invoked. If you would like to call a method of another module or behavior, you can use `call()`:

```JavaScript
this.future(20).call("Module$Behavior", "mth");
```

### `addEventListener(eventName:EventName, listener:function|string)`
`type EventName = "pointerDown"|"pointerUp"|pointerMove"|"pointerTap"|"pointerLeave"|"pointerEnter"|"wheel"|"doubleDown"|"click"|"keyUp"|"keyDown"`

This method adds a "listener" to be invoked when an event occures on the pawn of a card. When `listener` is a string, it has to have the name of an existing method of CardPawn or the behavior itself. (Internally the function object is stored in the event listener data structure.)

Calling this with the same arguments (thus the string form) removes the previous listener and then add the new one. This semantics ensures that dynamically-modified method will be used.

### `removeEventListener(eventName:EventName, listener:function|string)`
`type EventName = "pointerDown"|"pointerUp"|pointerMove"|"pointerTap"|"pointerLeave"|"pointerEnter"|"wheel"|"doubleDown"|"click"|"keyUp"|"keyDown"`

This method removes the event listener that was added. You can call it even when there is no matching event listener.

### `subscribe(scope:string, eventName:string, listener:function|string)`

This method adds Croquet event subscription. Unlike the version in the Croquet Library, this version removes the subscription with the same `scope` and `eventName` if it exists before adding a new one; so that it is safe to call this from the `setup()` of a behavior.

The `listener` can be either a function or a string in the form of:

* "`*ModuleName*$*BehaviorName*.*methodName*"`
* `"*BehaviorName*.*methodName*"`
* `"*methodName*"`

### `listen(eventName:string, listener:function|string)`

This method add a Croquet event subscription by calling the `subscribe()` method with `this.actor.id` as the `scope`.

### `sayDeck(message:string, data:any)`

This method publishes a Croquet event in the scope of `this.actor._parent.id` if `this.actor._parent` is not undefined, or in `this.actor.id` if it is undefined. Note that `this.actor.parent` is resolved dynamically at the call time.

### `listenDeck(message:string, listener:function|string)`

This method subscribes a Croquet event in the scope of `this.actor._parent.id` if `this.actor._parent` is not undefined, or in `this.actor.id` if it is undefined. Note that `this.parent` is resolved at the first time it is called, and any change to `this.actor._parent` will not update the subscription.

### `roundedCornerGeometry(width:number, height:number, depth:number, cornerRadius:number):Geometry`

This method creates a flat card like Three.JS geometry in specified in `width`, `height`, `depth`, and `cornerRadius`.

### `makePlaneMaterial(depth:number, color:number, frameColor:number, fullBright:boolean):Material|Array<Material>`

This method creates a Three.JS material that can be used with the geometry created by `roundedCornerGeometry()`. When the depth is non-zero, thus it is expected that the geometry from `roundedCornerGeometry()` has "sides", this method returns an array of materials with `color` and `frameColor`. Otherwise, it return a material with `color`.

### `setTranslation(v:Array<number, number, number>)`

This method publishes an event `setTranslation`, which is handled by the corresponding actor to update the translation of all peers, and then the view on all peers.

### `setRotation(v:Array<number, number, number, number>)`

This method publishes an event `setRotation`, which is handled by the corresponding actor to update the rotation of all peers, and then the view on all peers.

### `nop()`

This method is empty. It is used to have a way to get the tap to focus keyboard events but you don't need to take any particular action on tap.

