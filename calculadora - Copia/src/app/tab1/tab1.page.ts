import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  resultado: string = "0";
  memoria: string = "";
  verifica_zero: boolean = true;
  operador_inserido: boolean = false;
  is_segundo_elemento: boolean = false;
  primeiro_elemento: string = "";
  segundo_elemento: string = "";
  operador: string = "";
  is_novo_calculo: boolean = false;

//permite com que voce coloque os números através do teclado
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Verifica se a tecla pressionada é um número de 0 a 9
    if (event.key >= '0' && event.key <= '9') {
      this.digitos(event.key);
    } else if (event.key === '+') {
      this.operadores('+');
    } else if (event.key === '-') {
      this.operadores('-');
    } else if (event.key === '*') {
      this.operadores('*');
    } else if (event.key === '/') {
      this.operadores('/');
    } else if (event.key === 'Backspace') {
      this.apagar();
    } else if (event.key === 'Enter' || event.key === '=') {
      this.calcular();
    }
  }

  constructor() { }

  digitos(valor: string) {
    if (this.is_novo_calculo) {
      this.resetar();
      if(this.is_segundo_elemento){
        this.segundo_elemento += valor;
        this.resultado += valor;
      } else {
        if (this.verifica_zero) {
          this.resultado = valor;
          this.verifica_zero = false;
        } else {
          this.resultado += valor;
        }
      }
    } else {
      if(this.is_segundo_elemento){
        this.segundo_elemento += valor;
        this.resultado += valor;
      } else {
        if (this.verifica_zero) {
          this.resultado = valor;
          this.verifica_zero = false;
        } else {
          this.resultado += valor;
        }
      }
    }

  }

  operadores(operador: string) {
    if (!this.operador_inserido && this.verifica_zero == false) {
      this.primeiro_elemento = this.resultado;
      this.resultado += operador;
      this.operador_inserido = true;
      this.operador = operador;
      this.is_segundo_elemento = true;
    }
  }

  // realiza o cálculo
  calcular() {
    if (this.operador && this.segundo_elemento !== "") {
      // realiza o cálculo
      switch (this.operador) {
        case "+":
          this.resultado = (parseFloat(this.primeiro_elemento) + parseFloat(this.segundo_elemento)).toString();
          break;
        case "-":
          this.resultado = (parseFloat(this.primeiro_elemento) - parseFloat(this.segundo_elemento)).toString();
          break;
        case "*":
          this.resultado = (parseFloat(this.primeiro_elemento) * parseFloat(this.segundo_elemento)).toString();
          break;
        case "/":
          this.resultado = (parseFloat(this.primeiro_elemento) / parseFloat(this.segundo_elemento)).toString();
          break;
        case "%":
          this.resultado = (parseFloat(this.primeiro_elemento) * parseFloat(this.segundo_elemento) / 100).toString();
          break;
        default:
          break;
      }
  
      // Atualiza a memória
      this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + "=" + this.resultado;
  
      // Atualiza o estado para permitir cálculos sequenciais
      this.is_novo_calculo = true;
      this.operador_inserido = false;
      this.is_segundo_elemento = false;
      this.primeiro_elemento = this.resultado;
      this.segundo_elemento = "";
      this.operador = "";
    }
  }
  
  // apaga número
  apagar() {
    if (this.resultado.length > 1) {
      this.resultado = this.resultado.slice(0, -1);
    } else {
      this.resultado = "0";
      this.verifica_zero = true;
    }
  }

  // resetar
  resetar() {
    this.resultado = "0";
    this.memoria = "";
    this.verifica_zero = true;
    this.operador_inserido = false;
    this.is_segundo_elemento = false;
    this.primeiro_elemento = "";
    this.segundo_elemento = "";
    this.operador = "";
    this.is_novo_calculo = false;
  }

  // reciproco
  reciproco() {
    this.resultado = (1 / parseFloat(this.resultado)).toString();
  }
 

  potenciacao() {
    this.resultado = (Math.pow(parseInt(this.primeiro_elemento), parseInt(this.segundo_elemento))).toString();
    this.memoria = this.primeiro_elemento + "^" + this.segundo_elemento + "=" + this.resultado;
  }

  radiciacao() {

    let primeiroNumero = parseInt(this.resultado);
  
    if (!isNaN(primeiroNumero) && primeiroNumero >= 0) {
      // Verifica se o número é um número válido para a raiz quadrada
      this.resultado = Math.sqrt(primeiroNumero).toString();
      this.memoria = `√ ${this.primeiro_elemento} = ${this.resultado}`;
    } else {
      alert("Entrada inválida para a raiz quadrada");
    }
  }

  porcentagem() {
    this.resultado = ((parseInt(this.primeiro_elemento) * parseInt(this.segundo_elemento)) / 100).toString();
    this.memoria = this.primeiro_elemento + "%" + this.segundo_elemento + "=" + this.resultado;
  }
  
  adicionarDecimal() {
    if (!this.resultado.includes('.')) {
      this.resultado += '.';
      this.verifica_zero = false;
    }
  }

  inverterSinal() {
    this.resultado = (parseFloat(this.resultado) * -1).toString();
  }

  limparEntrada() {
    this.resultado = "0";
    this.verifica_zero = true;
  }

  quadrado() {
    this.resultado = (Math.pow(parseFloat(this.resultado), 2)).toString();
  }

  abrirImagemNoGoogle() {
    // Substitua a URL abaixo pela URL da imagem do Google que você deseja abrir
    const urlDaImagem = 'https://media-gru2-2.cdn.whatsapp.net/v/t61.24694-24/350391611_2420386894787178_5967010742678178571_n.jpg?ccb=11-4&oh=01_AdQ84w99IRVtJqSPeyJSIUdJU5i6eQw6PJY0yhqdNL3kCA&oe=65709864&_nc_sid=e6ed6c&_nc_cat=109';

    // Abre a imagem em uma nova janela ou aba do navegador
    window.open(urlDaImagem, '_blank');
  }


}
