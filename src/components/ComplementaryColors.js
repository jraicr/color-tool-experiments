import { getComplementaryAdditiveColor, getComplementarySubtractiveColor } from "../modules/colorUtils.js";

import "./ColorBox.js";

class ComplementaryColors extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.complementary = {
      color: {
        additive: "#000",
        subtractive: "#000"
      }
    };

    this.elements = {
      colorBox: {
        additive: null,
        subtractive: null
      }
    };
  }

  static get styles() {
    return /* css */` 
      .complementary-containers {
        display: flex;
        flex-flow: row wrap;
        column-gap: 5rem;
        justify-content: center;
        margin-top: 5rem;
      }

      .complementary-containers h2 {
        width: 100%;
        text-align: center;
      }

      .additives,
      .subtractives {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 7rem;
      }`;
  }

  connectedCallback() {
    this.render();
    this.awake();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
      <style>${ComplementaryColors.styles}</style>
      <div class="complementary-containers">
        <h2> Colores Complementarios </h2>
        <div class="additives">
          <h3>Aditivo</h3>
          <color-box/>
        </div>

        <div class="subtractives">
          <h3>Sustractivo</h3>
          <color-box/>
        </div>
      </div>`;
  }

  awake() {
    document.addEventListener("color:change", (event) => {
      this.update(event.detail.selectedColor);
    });

    this.elements.colorBox.additive = this.shadowRoot.querySelector(".additives color-box");
    this.elements.colorBox.subtractive = this.shadowRoot.querySelector(".subtractives color-box");
  }

  update(color) {
    const compAdditive = getComplementaryAdditiveColor(color);
    const compSubtractive = getComplementarySubtractiveColor(color);

    this.complementary.color.additive = compAdditive;
    this.elements.colorBox.additive.update(compAdditive);

    this.complementary.color.subtractive = compSubtractive;
    this.elements.colorBox.subtractive.update(compSubtractive);
  }
}

customElements.define("complementary-colors", ComplementaryColors);
