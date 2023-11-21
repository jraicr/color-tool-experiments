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
        <color-box editable-label/>
      </div>`;
  }

  awake() {
    this.elements.colorPicker = this.shadowRoot.querySelector("#color-picker");
    const colorPicker = new iro.ColorPicker(this.elements.colorPicker);

    this.colorBox = this.shadowRoot.querySelector(".selected-color-container color-box");
    this.colorBox.update(this.selectedColor);

    this.setupEditableLabel(colorPicker);

    colorPicker.on("input:change", (color) => { this.colorPickerCallback(color.hexString); });
  }

  setupEditableLabel(colorPicker) {
    this.colorBox.elements.colorBoxLabel.addEventListener("input", (event) => {
      this.editableLabelCallback(colorPicker, event);
    });

    this.colorBox.elements.colorBoxLabel.addEventListener("blur", (event) => {
      if (!event.target.innerText.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i)) {
        event.target.innerText = this.selectedColor.toUpperCase();
      }
    });
  }

  editableLabelCallback(colorPicker, event) {
    // A veces quedan eventos pendientes y se ejecuta
    // cuando no debe, por lo que lo eliminamos temporalmente
    colorPicker.off("input:change");

    if (event.target.innerText.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i)) {
      colorPicker.color.hexString = event.target.innerText;
      this.colorPickerCallback(colorPicker.color.hexString, false);
    }

    // Restablecemos el evento del input
    colorPicker.on("input:change", (color) => { this.colorPickerCallback(color.hexString); });
  }

  colorPickerCallback(colorHex, updateLabel = true) {
    this.selectedColor = colorHex;
    this.colorBox.update(colorHex, updateLabel);

    const colorSelectedEvent = new CustomEvent("color:change", {
      bubbles: true,
      detail: {
        selectedColor: this.selectedColor
      }
    });

    this.dispatchEvent(colorSelectedEvent);
  }
}

customElements.define("color-picker", ColorPicker);
