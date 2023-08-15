import css from './index.module.css';
import { OrderStage } from '../../../../../types/data';
import { ReactComponent as Check } from '../../../../../images/check.svg';
import { monthAndDayFromDate } from '../../../../../utils/data';

interface Props {
  stages: OrderStage[];
}

export function OrderStages({ stages }: Props) {
  const done = stages.filter((stage) => stage.is_done).length;
  const percentage = (done > 0 ? done - 1 : done) / (stages.length - 1) * 100;

  return (
    <div className={css.container}>
      {stages.map((stage) => (
        <Stage key={stage.id} stage={stage} />
      ))}
      <div className={css.bar}>
        <div
          className={css.progress}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface StageProps {
  stage: OrderStage;
}

function Stage({ stage }: StageProps) {
  return (
    <div className={css.stage}>
      <div className={`${css.circle} ${stage.is_done ? css.done : css.notDone}`}>
        <Check className={css.checkSVG} />
      </div>
      <div className={css.label}>
        <span className={css.stageName}>
          {stage.stage_type.name}
        </span>

        {stage.is_done && (
          <span className={css.stageDate}>
            ({monthAndDayFromDate(stage.modified_at)})
          </span>
        )}
      </div>
    </div>
  );
}
