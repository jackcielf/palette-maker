import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public colorVariants: Object[] = [];
  public color: string;

  public createColorsPrimariesAndSecondaries() {
    this.generateColors(this.color);
  }

  // Converte HEX para RGB
  private hexToRgb(hex: string) {
    let r = 0, g = 0, b = 0;

    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    }
    else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }

    return { r, g, b };
  }

  // Converte RGB para HEX
  private rgbToHex(r: number, g: number, b: number) {
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase()}`;
  }

  private adjustColor(hex: string, factor: number) {
    const { r, g, b } = this.hexToRgb(hex);
    const newR = Math.min(255, Math.max(0, r + factor));
    const newG = Math.min(255, Math.max(0, g + factor));
    const newB = Math.min(255, Math.max(0, b + factor));

    return this.rgbToHex(newR, newG, newB);
  }

  // Gera variantes da cor
  private generateColorsVariants(color: string, colorName: string) {
    const variants: { [key: string]: string } = {};

    for (let i = 100; i <= 900; i += 100) {
      const factor = (i / 100 - 5) * 10; // Ajusta o fator de acordo com a intensidade desejada
      variants[`${colorName}${i}`] = this.adjustColor(color, factor);
    }

    return variants;
  }

  private generateColors(color: string) {
    const primaryVariants = this.generateColorsVariants(color, "colorPrimary");
    const secondaryBase = this.adjustColor(color, -60);
    const secondaryVariants = this.generateColorsVariants(secondaryBase, "colorSecondary");

    primaryVariants.colorPrimaryLight = this.adjustColor(color, 20);
    primaryVariants.colorPrimaryDark = this.adjustColor(color, -20);

    secondaryVariants.colorSecondaryLight = this.adjustColor(secondaryBase, 20);
    secondaryVariants.colorSecondaryDark = this.adjustColor(secondaryBase, -20);

    this.colorVariants = [
      primaryVariants,
      secondaryVariants,
    ];

    console.log(this.colorVariants);
  }

  public hasColorValid() {
    const isValid = !!(/^#[0-9A-Fa-f]+$/.test(this.color));
    
    if (isValid) return false;
    else return true;
  }
}