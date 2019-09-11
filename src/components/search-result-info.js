import {AbstractComponent} from "./absctract-component";

export class Result extends AbstractComponent {

  getTemplate() {

    return `<div class="result">
                <p class="result__text">Result <span class="result__count">1</span></p>
             </div>
`;
  }
}
