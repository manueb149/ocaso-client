import { Button, Form, Steps } from 'antd';
import React, { useState } from 'react';
import Contratante from '../../Contratante/Contratante';
import Dependientes from '../../Dependientes/Dependientes';
import Review from './Review';
import { IDependientes, IPlan } from '../../../models/interfaces.model';
import { Notify } from '../../../../config/notifications';
import { Dayjs } from 'dayjs';

const steps = [
  {
    title: 'Datos del contratante',
  },
  {
    title: 'Detalles del dependiente',
  },
  {
    title: 'Revisión',
  },
];

interface Props {
  planes: IPlan[];
}

const Individual: React.FC<Props> = ({ planes }) => {
  const [formContratante] = Form.useForm();
  const [formDependientes] = Form.useForm();
  const [current, setCurrent] = useState<number>(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div className="row" style={{ margin: '0' }}>
      <div className="col-12">
        <Steps progressDot current={current} items={items} style={{ marginTop: '20px' }} />
        <div className="steps-content" style={{ padding: '25px 0px' }}>
          <Form.Provider>
            <div className="row" style={{ display: current === 0 ? 'flex' : 'none' }}>
              <Contratante name="contratante" form={formContratante} planes={planes} next={next} />
            </div>
            <div className="row" style={{ display: current === 1 ? 'flex' : 'none' }}>
              <Dependientes name="dependiente" form={formDependientes} next={next} />
            </div>
            <div className="row" style={{ display: current === 2 ? 'flex' : 'none' }}>
              <Review />
            </div>
            <div className="steps-action" style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 0 0' }}>
              {current < steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={() => {
                    if (current === 0) formContratante.submit();
                    if (current === 1) formDependientes.submit();
                  }}
                >
                  Siguiente
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button
                  htmlType="submit"
                  type="primary"
                  onClick={() => {
                    console.log({
                      ...(formContratante.getFieldValue('desde') && {
                        desde: (formContratante.getFieldValue('desde') as Dayjs).toISOString(),
                      }),
                      ...(formContratante.getFieldValue('hasta') && {
                        hasta: (formContratante.getFieldValue('hasta') as Dayjs).toISOString(),
                      }),
                      inscritos:
                        formDependientes.getFieldValue('inscritos')?.map((inscrito: IDependientes) => ({
                          ...inscrito,
                          dob: (inscrito.dob as Dayjs).toISOString(),
                        })) || [],
                      contratante: formContratante.getFieldValue('contratante'),
                      vendedor: formContratante.getFieldValue('vendedor'),
                      plan: {
                        nombre: formContratante.getFieldValue('plan'),
                        valor: formContratante.getFieldValue('valor'),
                        prima: formContratante.getFieldValue('prima'),
                      },
                      vigencia: (formContratante.getFieldValue('hasta') as Dayjs)
                        .diff(formContratante.getFieldValue('desde') as Dayjs, 'years', true)
                        .toFixed(1),
                    });
                    Notify('success', 'Solicitud guardada!', 5000);
                  }}
                >
                  Finalizar
                </Button>
              )}
              {current > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                  Anterior
                </Button>
              )}
            </div>
          </Form.Provider>
        </div>
      </div>
      <div className="col-12"></div>
    </div>
  );
};

export default Individual;
