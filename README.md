# Gratuitator (v1.0)

Gratuitator is a yet another tooltip plugin for jQuery for displaying short text content in a style-able and imageless tooltip. It works by displaying an element's attribute of your choosing in a tooltip on hover. This plugin was inspired by the Facebook tooltips and the need to show additional information for more visual items.


## Compatibility

This release uses Canvas to draw the caret. Browser without canvas support will simply show the tooltip without the caret.

* **Safari 4**
* **Chrome**
* **Firefox 4**
* Everything else not tested yet

## Usage

Include `jquery.js` and `jquery.gratuitator.js` in your document:

    <script src="javascripts/jquery.gratuitator.js" type="text/javascript"></script>
    
Include `gratuitator.css` or its styles in your document.

    <link href="gratuitator.css" rel="stylesheet" type="text/css" />

Initiate the plugin on DOMready and tell gratuitator what selector to use

    $(function() {
      $("a.tip").gratuitator();
    });

Any anchor links with a class of "tip" will display their title attribute in a tooltip on hover.

    <a href="http://youtube.com" title="Let's waste some time." class="tip">Entertainment</a>
      Displays "Let's waste some time." in a tooltip above the link.

Gratuitator works on any element with any attribute:

    $(function() {
      $("img").gratuitator({ 'contentAttr': 'src' });
    });

The above will display the source of an image in a tooltip above it.


### Options

<table>
  <thead>
    <th>Name</th>
    <th>Default Value</th>
    <th>Description</th>
  </thead>
  <tbody>
    <tr>
      <td><code>caretColor</code></td>
      <td><code>'#333, #111'</code></td>
      <td>Background color for the tooltip caret. Will accept one or two hex colors: if you provide two, a gradient will be used.</td>
    </tr>
    <tr>
      <td><code>caretSize</code></td>
      <td><code>8</code></td>
      <td>Size of the 90˚ caret.</td>
    </tr>
    <tr>
      <td><code>contentAttr</code></td>
      <td><code>'title'</code></td>
      <td>The attribute of the wrapped set that will be displayed in the tooltip. In order to prevent a system tooltip from firing when using the title attribute, gratuitator swaps the title attribute with the data-gratuitator-title attribute on hover.</td>
    </tr>
    <tr>
      <td><code>tipOffset</code></td>
      <td><code>16</code></td>
      <td>Distance in pixels of the tooltip from the content.</td>
    </tr>
    <tr>
      <td><code>tipXPosition</code></td>
      <td><code>left</code></td>
      <td>X Position of tooltip relative to the target. Accepts `left`, `right`, or `center`.</td>
    </tr>
    <tr>
      <td><code>tipYPosition</code></td>
      <td><code>above</code></td>
      <td>Y Position of tooltip relative to the target. Accepts `above`, `below`, or `inline`.</td>
    </tr>
  </tbody>
</table>

## To Do

* Detect browser edges and reposition accordingly.
* Maybe some optional effects/timeouts