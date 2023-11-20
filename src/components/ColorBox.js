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
        <div class="color-box-label">#000000</div>
      </div>`;
  }

  awake() {
    this.elements.colorBox = this.shadowRoot.querySelector(".color-box");
    this.elements.colorBoxLabel = this.shadowRoot.querySelector(".color-box-label");
  }

  update(color) {
    this.color = color;
    this.elements.colorBox.style.backgroundColor = this.color;
    this.elements.colorBoxLabel.innerHTML = this.color.toUpperCase();
  }
}

customElements.define("color-box", ColorBox);
