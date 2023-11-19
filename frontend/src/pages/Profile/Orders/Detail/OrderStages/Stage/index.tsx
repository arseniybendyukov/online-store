import css from './index.module.css';
import { OrderStage } from '../../../../../../types/data';
import { SetState } from '../../../../../../types/common';
import { ReactComponent as Check } from '../../../../../../images/check.svg';
import { monthAndDayFromDate } from '../../../../../../utils/data';

interface Props {
  stage: OrderStage;
  selectedStageId: number | null;
  setSelectedStageId: SetState<number | null>;
}

export function Stage({
  stage,
  selectedStageId,
  setSelectedStageId,
}: Props) {
  return (
    <div
      className={`${css.stage} ${stage.is_done ? css.done : ''} ${stage.stage_type.id === selectedStageId ? css.selected : 0}`}
      onClick={() => setSelectedStageId(stage.stage_type.id)}
    >
      <div className={css.circle}>
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