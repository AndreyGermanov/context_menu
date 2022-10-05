## Classes

<dl>
<dt><a href="#Menu">Menu</a></dt>
<dd></dd>
<dt><a href="#Menus">Menus</a></dt>
<dd></dd>
<dt><a href="#MenuStylesHelper">MenuStylesHelper</a></dt>
<dd></dd>
</dl>

<a name="Menu"></a>

## Menu
**Kind**: global class  

* [Menu](#Menu)
    * [new Menu(items, container, eventType)](#new_Menu_new)
    * [.panel](#Menu+panel) : <code>HTMLDivElement</code>
    * [.container](#Menu+container) : <code>HTMLElement</code>
    * [.items](#Menu+items) : <code>Array</code>
    * [.event](#Menu+event) : <code>string</code>
    * [.cursorX](#Menu+cursorX) : <code>number</code>
    * [.cursorY](#Menu+cursorY) : <code>number</code>
    * [.init()](#Menu+init) ⇒ [<code>Menu</code>](#Menu)
    * [.show()](#Menu+show)
    * [.hide()](#Menu+hide)
    * [.addItem(id, title, image)](#Menu+addItem)
    * [.removeItem(id)](#Menu+removeItem)
    * [.findItemById(id)](#Menu+findItemById) ⇒ <code>HTMLDivElement</code>
    * [.setId(id)](#Menu+setId)
    * [.on(eventName, handler)](#Menu+on) ⇒ <code>function</code>
    * [.off(eventName, handler)](#Menu+off)
    * [.removeAllEventListeners()](#Menu+removeAllEventListeners)
    * [.destroy()](#Menu+destroy)

<a name="new_Menu_new"></a>

### new Menu(items, container, eventType)
Context menu panel object.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| items | <code>array</code> |  | Array of menu items. Each item is an object with a following fields: `id` - unique ID of menu item. `title` - Text of menu of item `image` - URL of image, displayed on the left side of menu item (optional) |
| container | <code>HTMLElement</code> |  | HTML element to which this menu belongs |
| eventType | <code>string</code> | <code>null</code> | Name of event on HTML element that triggers the menu to appear (by default `contextmenu`, triggers when user do right mouse click on element) |

<a name="Menu+panel"></a>

### menu.panel : <code>HTMLDivElement</code>
Menu panel element

**Kind**: instance property of [<code>Menu</code>](#Menu)  
<a name="Menu+container"></a>

### menu.container : <code>HTMLElement</code>
Event on HTML element that triggers the menu to appear

**Kind**: instance property of [<code>Menu</code>](#Menu)  
<a name="Menu+items"></a>

### menu.items : <code>Array</code>
Array of menu items. Each item is an object with a following fields:
`id` - unique ID of menu item.
`title` - Text of menu of item
`image` - URL of image, displayed on the left side of menu item (optional)

**Kind**: instance property of [<code>Menu</code>](#Menu)  
<a name="Menu+event"></a>

### menu.event : <code>string</code>
Name of event on HTML element that triggers the menu to appear
(by default `contextmenu`, triggers when user do right mouse click on element)

**Kind**: instance property of [<code>Menu</code>](#Menu)  
<a name="Menu+cursorX"></a>

### menu.cursorX : <code>number</code>
Mouse cursor X position in a moment when event to show menu triggered

**Kind**: instance property of [<code>Menu</code>](#Menu)  
<a name="Menu+cursorY"></a>

### menu.cursorY : <code>number</code>
Mouse cursor Y position in a moment when event to show menu triggered

**Kind**: instance property of [<code>Menu</code>](#Menu)  
<a name="Menu+init"></a>

### menu.init() ⇒ [<code>Menu</code>](#Menu)
Method constructs and initializes menu, based on
settings, provided in constructor

**Kind**: instance method of [<code>Menu</code>](#Menu)  
**Returns**: [<code>Menu</code>](#Menu) - this menu object  
<a name="Menu+show"></a>

### menu.show()
Method shows menu

**Kind**: instance method of [<code>Menu</code>](#Menu)  
<a name="Menu+hide"></a>

### menu.hide()
Method hides menu

**Kind**: instance method of [<code>Menu</code>](#Menu)  
<a name="Menu+addItem"></a>

### menu.addItem(id, title, image)
Method used to dynamically add item to menu

**Kind**: instance method of [<code>Menu</code>](#Menu)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Unique ID of item |
| title | <code>string</code> | Text of menu item |
| image | <code>string</code> | URL of menu item image (optional) |

<a name="Menu+removeItem"></a>

### menu.removeItem(id)
Method used to remove menu item

**Kind**: instance method of [<code>Menu</code>](#Menu)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | ID of item to remove |

<a name="Menu+findItemById"></a>

### menu.findItemById(id) ⇒ <code>HTMLDivElement</code>
Method used to return HTML node of menu item by ID

**Kind**: instance method of [<code>Menu</code>](#Menu)  
**Returns**: <code>HTMLDivElement</code> - DIV html element of menu item  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | ID of menu item |

<a name="Menu+setId"></a>

### menu.setId(id)
Method used to set unique ID of this menu panel.

**Kind**: instance method of [<code>Menu</code>](#Menu)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | ID to set |

<a name="Menu+on"></a>

### menu.on(eventName, handler) ⇒ <code>function</code>
Method used to subscribe to menu item event.

**Kind**: instance method of [<code>Menu</code>](#Menu)  
**Returns**: <code>function</code> - Returns a created listener object which can be used later to unsubscribe from this event  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | Name of event to subscribe (click, mouseover, mouseout or other) |
| handler | <code>function</code> | Handler function that will execute on event. Function receives `event` argument which is a standard MouseEvent with all properties and in addition, contains the following important fields: `itemId` - ID of menu item that triggered this event, `cursorX` - X position of mouse cursor on container in a moment the menu appeared, `cursorY` - Y position of mouse cursor on container in a moment the menu appeared. |

<a name="Menu+off"></a>

### menu.off(eventName, handler)
Method used to unsubscribe from menu item event

**Kind**: instance method of [<code>Menu</code>](#Menu)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | name of event to unsubscribe, (click, mouseover, mouseout or other) |
| handler | <code>function</code> | event handler to remove from subscriptions, that previously returned by `on` function |

<a name="Menu+removeAllEventListeners"></a>

### menu.removeAllEventListeners()
Method used to unsubscribe from all events, previously subscribed using `on` or `addEventListener`
methods

**Kind**: instance method of [<code>Menu</code>](#Menu)  
<a name="Menu+destroy"></a>

### menu.destroy()
Method used to destroy menu: removes all subscriptions
and menu panel element from DOM.

**Kind**: instance method of [<code>Menu</code>](#Menu)  
<a name="Menus"></a>

## Menus
**Kind**: global class  

* [Menus](#Menus)
    * [new Menus()](#new_Menus_new)
    * [.create(items, container, eventName)](#Menus+create) ⇒ [<code>Menu</code>](#Menu)

<a name="new_Menus_new"></a>

### new Menus()
Factory class for menus. Used to construct new context menus.

<a name="Menus+create"></a>

### menus.create(items, container, eventName) ⇒ [<code>Menu</code>](#Menu)
Method used to create new context menu

**Kind**: instance method of [<code>Menus</code>](#Menus)  
**Returns**: [<code>Menu</code>](#Menu) - Constructed [Menu](#Menu) object.  

| Param | Type | Description |
| --- | --- | --- |
| items | <code>array</code> | Items to include to menu. Each item is an object with fields: `id` - ID of menu item, `title` - text of menu item, `image` - URL of image of menu item (optional) |
| container | <code>HTMLElement</code> | HTML element to which this menu belongs |
| eventName | <code>string</code> | Name of event which should be triggered on `container` to display this menu. By default `contextmenu`, so, menu will appear when right mouse click on it. Could be any other mouse event like `click`, `mouseover`, `mousedown` or others. |

<a name="MenuStylesHelper"></a>

## MenuStylesHelper
**Kind**: global class  

* [MenuStylesHelper](#MenuStylesHelper)
    * [new MenuStylesHelper(menu)](#new_MenuStylesHelper_new)
    * [.menu](#MenuStylesHelper+menu) : [<code>Menu</code>](#Menu)
    * [.panelCssClass](#MenuStylesHelper+panelCssClass) : <code>string</code>
    * [.itemCssClass](#MenuStylesHelper+itemCssClass) : <code>string</code>
    * [.itemTextCssClass](#MenuStylesHelper+itemTextCssClass) : <code>string</code>
    * [.itemImageCssClass](#MenuStylesHelper+itemImageCssClass) : <code>string</code>
    * [.itemsCssClassesById](#MenuStylesHelper+itemsCssClassesById) : <code>object</code>
    * [.setPanelClass(className)](#MenuStylesHelper+setPanelClass)
    * [.setItemClass(className, id)](#MenuStylesHelper+setItemClass)
    * [.setTextClass(className, id)](#MenuStylesHelper+setTextClass)
    * [.setImageClass(className, id)](#MenuStylesHelper+setImageClass)

<a name="new_MenuStylesHelper_new"></a>

### new MenuStylesHelper(menu)
Extender class for `Menu` class, which extends it by methods
used to change styles of menu panel and menu items. All methods of
this class can be executed directly on `Menu` instance.


| Param | Type | Description |
| --- | --- | --- |
| menu | [<code>Menu</code>](#Menu) | Menu object to extend |

<a name="MenuStylesHelper+menu"></a>

### menuStylesHelper.menu : [<code>Menu</code>](#Menu)
Menu object to extend

**Kind**: instance property of [<code>MenuStylesHelper</code>](#MenuStylesHelper)  
<a name="MenuStylesHelper+panelCssClass"></a>

### menuStylesHelper.panelCssClass : <code>string</code>
CSS class that used to style menu panel

**Kind**: instance property of [<code>MenuStylesHelper</code>](#MenuStylesHelper)  
<a name="MenuStylesHelper+itemCssClass"></a>

### menuStylesHelper.itemCssClass : <code>string</code>
CSS class name or names that used to style menu items DIV elements

**Kind**: instance property of [<code>MenuStylesHelper</code>](#MenuStylesHelper)  
<a name="MenuStylesHelper+itemTextCssClass"></a>

### menuStylesHelper.itemTextCssClass : <code>string</code>
CSS class name or names that used to style text of menu items

**Kind**: instance property of [<code>MenuStylesHelper</code>](#MenuStylesHelper)  
<a name="MenuStylesHelper+itemImageCssClass"></a>

### menuStylesHelper.itemImageCssClass : <code>string</code>
CSS class name or names that used to style images of menu items

**Kind**: instance property of [<code>MenuStylesHelper</code>](#MenuStylesHelper)  
<a name="MenuStylesHelper+itemsCssClassesById"></a>

### menuStylesHelper.itemsCssClassesById : <code>object</code>
CSS classes for concrete items by their IDs.

**Kind**: instance property of [<code>MenuStylesHelper</code>](#MenuStylesHelper)  
<a name="MenuStylesHelper+setPanelClass"></a>

### menuStylesHelper.setPanelClass(className)
Method used to override CSS class for menu panel

**Kind**: instance method of [<code>MenuStylesHelper</code>](#MenuStylesHelper)  

| Param | Type | Description |
| --- | --- | --- |
| className | <code>string</code> | CSS class to apply |

<a name="MenuStylesHelper+setItemClass"></a>

### menuStylesHelper.setItemClass(className, id)
Method used to override CSS class for menu items
or only for menu item with specified `id`

**Kind**: instance method of [<code>MenuStylesHelper</code>](#MenuStylesHelper)  

| Param | Type | Description |
| --- | --- | --- |
| className | <code>string</code> | CSS class to apply |
| id | <code>string</code> | ID of item or null |

<a name="MenuStylesHelper+setTextClass"></a>

### menuStylesHelper.setTextClass(className, id)
Method used to override CSS class for text of menu items
or only for menu item with specified `id`

**Kind**: instance method of [<code>MenuStylesHelper</code>](#MenuStylesHelper)  

| Param | Type | Description |
| --- | --- | --- |
| className | <code>string</code> | CSS class to apply |
| id | <code>string</code> | ID of item or null |

<a name="MenuStylesHelper+setImageClass"></a>

### menuStylesHelper.setImageClass(className, id)
Method used to override CSS class for images of menu items
or only for menu item with specified `id`

**Kind**: instance method of [<code>MenuStylesHelper</code>](#MenuStylesHelper)  

| Param | Type | Description |
| --- | --- | --- |
| className | <code>string</code> | CSS class to apply |
| id | <code>string</code> | ID of item or null |

<a name="ItemParts"></a>

## ItemParts
Enumeration of menu item parts using internally
to define CSS classes for different parts of menu item

**Kind**: global enum  

| Param | Description |
| --- | --- |
| div | DIV element that contains menu item |
| text | text inside menu item |
| image | image inside menu item |

**Properties**

| Name | Default |
| --- | --- |
| ITEM | <code>div</code> | 
| TEXT | <code>text</code> | 
| IMAGE | <code>image</code> | 

