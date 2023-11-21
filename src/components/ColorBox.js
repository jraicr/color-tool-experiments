class ColorBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.color = "#000";
    this.elements = {
      colorBox: null,
      colorBoxLabel: null
    };
  }

  static get styles() {
    return /* css */`   
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
    } 

    .color-box {
      width: 50px;
      height: 50px;
      background-color: #000;
      border: 1px solid #ccc;
    }

    .color-box-label {
      color: #fff;
      margin-top: 0.75rem;
      font-weight: 300;
    }
    `;
  }

  connectedCallback() {
    this.render();
    this.awake();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
      <style>${ColorBox.styles}</style>
      <div class="container">
        <div class="color-box"></div>
      </div>`;
  }

  awake() {
    this.elements.colorBox = this.shadowRoot.querySelector(".color-box");
    // Comprueba si existe el atributo no-label, si existe, no crea el label
    this.createLabel(this.elements.colorBox.parentElement);
  }

  update(colorHex, updateLabel = true) {
    this.changeColor(colorHex);

    if (this.elements.colorBoxLabel && updateLabel) {
      this.elements.colorBoxLabel.innerHTML = this.color.toUpperCase();
    }
  }

  changeColor(colorHex) {
    this.color = colorHex;
    this.elements.colorBox.style.backgroundColor = this.color;
  }

  /**
   *
   * @param {HTMLElement} parentElement
   */
  createLabel(parentElement) {
    const labelDivElement = document.createElement("div");
    labelDivElement.className = "color-box-label";
    labelDivElement.innerHTML = this.color;

    if (this.hasAttribute("editable-label")) {
      labelDivElement.contentEditable = true;
      labelDivElement.addEventListener("input", (event) => {
        this.changeColor(event.target.innerText);
      });
    }

    parentElement.appendChild(labelDivElement);

    this.elements.colorBoxLabel = this.shadowRoot.querySelector(".color-box-label");
  }
}

customElements.define("color-box", ColorBox);
