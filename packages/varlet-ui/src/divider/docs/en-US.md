# Divider

### Intro
Used to separate parts of a list or layout.


### Install

```js
import { createApp } from 'vue'
import { Divider } from '@varlet/ui'

createApp().use(Divider)
```

### Basic Usage
```html
<var-divider />
```

### Dashed Divider
```html
<var-divider dashed />
```

### Inset Divider
```html
<var-divider inset />
<var-divider :inset="36" margin="36px 0" />
<var-divider inset="-36px" />
```

### Vertical Divider
```html
<span>Text</span>
<var-divider vertical />
<span>Text</span>
<var-divider vertical />
<span>Text</span>
```

### The Divider with description
```html
<var-divider description="Description" />
```

### Custom
```html
<var-divider>
  <var-icon name="heart-outline" style="margin: 0 16px; color: rgb(41, 121, 255);" />
</var-divider>
```


## API

### Props
| Prop | Description | Type | Default | 
| --- | --- | --- | --- | 
| `inset` | Set the indentation distance, and the number plus or minus sign controls the direction of indentation. The default indentation is `72px` when `true` is passed | _boolean \| number \| string_ | `false` |
| `vertical` | Whether to set divider to display vertically | _boolean_ | `false` |
| `dashed` | Whether divider is dashed | _boolean_ | `false` |
| `description` | The text description of divider | _string_ | `-` |
| `margin` | Set `margin` of divider | _string_ | `-` |

### Slots
| Slot | Description | Arguments |
| --- | --- | --- |
| `default` | Custom content of divider | `-` |

### Style Variables
Here are the CSS variables used by the component, Styles can be customized using [StyleProvider](#/en-US/style-provider)

| Variable | Default |
| --- | --- |
| `--divider-color` | `#bcc2cb` |
| `--divider-text-color` | `#888`|
| `--divider-text-margin` | `8px 0`|
| `--divider-text-padding` | `0 8px`|
| `--divider-inset` |  `72px`|
| `--divider-vertical-inset` | `8px`|
