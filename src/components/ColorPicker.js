import iro from "@jaames/iro";

class ColorPicker extends HTMLElement {
  constructor() {
    super();
    this.colorPickerElement = null;
    this.selectedColor = null;
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`    
      
    `;
  }

  connectedCallback() {
    this.render();
    this.awake();
  }

  awake() {
    this.colorPickerElement = this.shadowRoot.querySelector("#color-picker");
    const colorPicker = new iro.ColorPicker(this.colorPickerElement);

    colorPicker.on("color:change", (color) => {
      this.selectedColor = color.hexString;

      const colorSelectedEvent = new CustomEvent("color:change", {
        bubbles: true,
        detail: {
          selectedColor: this.selectedColor
        }
      });

      this.dispatchEvent(colorSelectedEvent);
    });
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
      <style>${ColorPicker.styles}</style>
      <div id="color-picker" class="selector"></div>`;
  }
}

customElements.define("color-picker", ColorPicker);
