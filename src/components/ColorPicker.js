import iro from "@jaames/iro";
import "./ColorBox.js";

class ColorPicker extends HTMLElement {
  constructor() {
    super();

    this.colorBox = null;
    this.elements = {
      colorPicker: null,
    };

    this.selectedColor = "#ffffff";
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`    
      .selected-color-container {
        margin-top: 0.75rem;
      }
    `;
  }

  connectedCallback() {
    this.render();
    this.awake();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
      <style>${ColorPicker.styles}</style>
      <div id="color-picker"></div>
      <div class="selected-color-container">
        <color-box/>
      </div>
      
      `;
  }

  awake() {
    this.elements.colorPicker = this.shadowRoot.querySelector("#color-picker");
    const colorPicker = new iro.ColorPicker(this.elements.colorPicker);

    this.colorBox = this.shadowRoot.querySelector(".selected-color-container color-box");
    this.colorBox.update(this.selectedColor);

    colorPicker.on("color:change", (color) => {
      this.selectedColor = color.hexString;
      this.colorBox.update(color.hexString);

      const colorSelectedEvent = new CustomEvent("color:change", {
        bubbles: true,
        detail: {
          selectedColor: this.selectedColor
        }
      });

      this.dispatchEvent(colorSelectedEvent);
    });
  }
}

customElements.define("color-picker", ColorPicker);
