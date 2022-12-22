const serviceCalc = (data: any, values: any) => {
  const vars = {
    total: 0,
    anual: 0,
    mensual: 0,
    trimestral: 0,
    semestral: 0,
    VA: 0,
  };
  if (data.anual || data.mensual || data.trimestral || data.semestral) {
    vars.VA = data.VA !== '' ? data.VA : 0;
    if (data.anual) vars.anual = (vars.VA * Number(values.TASA_COMERCIAL)) / 1000;
    if (data.mensual)
      vars.mensual = ((vars.VA * Number(values.TASA_COMERCIAL)) / 1000 / 12) * (1 + Number(values.P_MENSUAL));
    if (data.trimestral)
      vars.trimestral = ((vars.VA * Number(values.TASA_COMERCIAL)) / 1000 / 3) * (1 + Number(values.P_TRIMESTRAL));
    if (data.semestral)
      vars.semestral = ((vars.VA * Number(values.TASA_COMERCIAL)) / 1000 / 2) * (1 + Number(values.P_SEMESTRAL));

    vars.total = vars.anual + vars.mensual + vars.trimestral + vars.semestral;

    return {
      subtotal: Number(vars.total).toFixed(2),
      itbis: Number(vars.total * 0.18).toFixed(2),
      total: Number(vars.total * 1.18).toFixed(2),
      vars,
    };
  }
  return {
    subtotal: Number(vars.total).toFixed(2),
    itbis: Number(vars.total * 0.18).toFixed(2),
    total: Number(vars.total * 1.18).toFixed(2),
    vars,
  };
};

export default serviceCalc;
