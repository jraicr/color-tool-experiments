import { getComplementaryAdditiveColor, getComplementarySubtractiveColor } from "../modules/colorUtils.js";

class ComplementaryColors extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.complementaries = {
      additive: "#000",
      subtractive: "#000"
    };
    this.elements = {
      additive: null,
      additiveLabel: null,
      subtractive: null,
      subtractiveLabel: null
    };
  }

  static get styles() {
    return /* css */` 
      .complementary-color {
        width: 50px;
        height: 50px;
        background-color: #000;
        border: 1px solid #ccc;
      }
      
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
      
      .complementary-label {
        color: #fff;
        margin-top: 0.75rem;
        font-weight: 300;
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
          <div id="additive" class="complementary-color"></div>
          <div class="complementary-label">#000000</div>
        </div>

        <div class="subtractives">
          <h3>Sustractivo</h3>
          <div id="subtractive" class="complementary-color"></div>
          <div class="complementary-label">#000000</div>
        </div>
      </div>`;
  }

  awake() {
    document.addEventListener("color:change", (event) => {
      this.update(event.detail.selectedColor);
    });

    this.elements.additive = this.shadowRoot.querySelector("#additive");
    this.elements.additiveLabel = this.shadowRoot.querySelector(".additives > .complementary-label");

    this.elements.subtractive = this.shadowRoot.querySelector("#subtractive");
    this.elements.subtractiveLabel = this.shadowRoot.querySelector(".subtractives > .complementary-label");
  }

  update(color) {
    const compAdditive = getComplementaryAdditiveColor(color);
    const compSubtractive = getComplementarySubtractiveColor(color);

    this.complementaries.additive = compAdditive;
    this.complementaries.subtractive = compSubtractive;

    this.elements.additive.style.backgroundColor = this.complementaries.additive;
    this.elements.additiveLabel.innerHTML = this.complementaries.additive.toUpperCase();

    this.elements.subtractive.style.backgroundColor = this.complementaries.subtractive;
    this.elements.subtractiveLabel.innerHTML = this.complementaries.subtractive.toUpperCase();
  }
}

customElements.define("complementary-colors", ComplementaryColors);
