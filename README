# Gratuitator

Gratuitator is a yet another tooltip plugin for jQuery that strives to be simple, completely style-able, and imageless. It works by displaying an attribute of your choosing in a tooltip positioned above the element. 


## Compatibility

This release relies on a lot of advanced CSS techniques (box-shadow, border-radius, RGBA). That being said, it's compatible with many browsers.

* **Safari 4**
* **Chrome**
* **Firefox 4**
* Everything else not tested yet

## Usage

Include `jquery.js` and `jquery.gratuitator.js` in your document:

    <script src="javascripts/jquery.gratuitator.js" type="text/javascript"></script>

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
      <td><code>backgroundColor</code></td>
      <td><code>'#333, #111'</code></td>
      <td>Background color for the tooltip. Will accept one or two hex colors: the first is the background of the main tooltip content, the second is the bottom half of a linear gradient applied to the caret. If only one color is given, the caret and tooltip are the same color.</td>
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
  </tbody>
</table>