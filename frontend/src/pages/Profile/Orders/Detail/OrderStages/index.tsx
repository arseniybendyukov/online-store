import css from './index.module.css';
import { OrderStage } from '../../../../../types/data';
import { SetState } from '../../../../../types/common';
import { Stage } from './Stage';

interface Props {
  stages: OrderStage[];
  selectedStageId: number | null;
  setSelectedStageId: SetState<number | null>;
}

export function OrderStages({
  stages,
  selectedStageId,
  setSelectedStageId,
}: Props) {
  const done = stages.filter((stage) => stage.is_done).length;
  const percentage = (done === stages.length ? done - 1 : done) / (stages.length - 1) * 100;

  return (
    <div className={css.container}>
      <div className={css.stages}>
        {stages.map((stage) => (
          <Stage
            key={stage.id}
            stage={stage}
            selectedStageId={selectedStageId}
            setSelectedStageId={setSelectedStageId}
          />
        ))}
      </div>
      <div className={css.bar}>
        <div
          className={css.progress}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
