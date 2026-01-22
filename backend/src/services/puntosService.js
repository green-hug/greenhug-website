class PuntosService {
  calcularPuntos(impacto) {
    let puntos = 0;
    puntos += impacto.litrosAgua / 2000;          // 2000 litros = 1 punto
    puntos += impacto.arbolesPlantados * 3;       // 1 árbol = 3 puntos
    puntos += impacto.botellasRecicladas / 8;     // 8 botellas = 1 punto
    puntos += impacto.voluntarios * 3;            // 1 voluntario = 3 puntos
    puntos += impacto.uniformesReciclados / 2;    // 2 uniformes = 1 punto
    puntos += impacto.co2Kg / 3;                 // 3kg CO2 = 1 punto
    return Math.round(puntos * 100) / 100;        // Redondear a 2 decimales
  }
  
  actualizarPuntosAcumulados(impactoActual, nuevoImpacto) {
    // Sumar los nuevos valores a los existentes
    return {
      litrosAgua: impactoActual.litrosAgua + (nuevoImpacto.litrosAgua || 0),
      arbolesPlantados: impactoActual.arbolesPlantados + (nuevoImpacto.arbolesPlantados || 0),
      botellasRecicladas: impactoActual.botellasRecicladas + (nuevoImpacto.botellasRecicladas || 0),
      voluntarios: impactoActual.voluntarios + (nuevoImpacto.voluntarios || 0),
      uniformesReciclados: impactoActual.uniformesReciclados + (nuevoImpacto.uniformesReciclados || 0),
      co2Kg: impactoActual.co2Kg + (nuevoImpacto.co2Kg || 0)
    };
  }
}



module.exports = new PuntosService();