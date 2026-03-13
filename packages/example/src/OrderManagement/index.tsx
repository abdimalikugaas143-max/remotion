import React from 'react';
import {springTiming, TransitionSeries} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {COLORS} from './constants';
import {SceneAssemblingWelding} from './scenes/SceneAssemblingWelding';
import {SceneFinanceReview} from './scenes/SceneFinanceReview';
import {SceneFullFlowSummary} from './scenes/SceneFullFlowSummary';
import {SceneIntro} from './scenes/SceneIntro';
import {SceneMaintenance} from './scenes/SceneMaintenance';
import {SceneOrderCreation} from './scenes/SceneOrderCreation';
import {SceneProductSelling} from './scenes/SceneProductSelling';
import {SceneRejectedPath} from './scenes/SceneRejectedPath';

const TRANS = 15;

const OrderManagement: React.FC = () => {
	return (
		<div
			style={{
				width: 1920,
				height: 1080,
				backgroundColor: COLORS.bg,
				overflow: 'hidden',
				fontFamily: 'system-ui, -apple-system, sans-serif',
			}}
		>
			<TransitionSeries>
				<TransitionSeries.Sequence durationInFrames={90}>
					<SceneIntro />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition
					presentation={fade()}
					timing={springTiming({durationInFrames: TRANS})}
				/>

				<TransitionSeries.Sequence durationInFrames={120}>
					<SceneOrderCreation />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition
					presentation={fade()}
					timing={springTiming({durationInFrames: TRANS})}
				/>

				<TransitionSeries.Sequence durationInFrames={180}>
					<SceneFinanceReview />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition
					presentation={fade()}
					timing={springTiming({durationInFrames: TRANS})}
				/>

				<TransitionSeries.Sequence durationInFrames={120}>
					<SceneRejectedPath />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition
					presentation={fade()}
					timing={springTiming({durationInFrames: TRANS})}
				/>

				<TransitionSeries.Sequence durationInFrames={210}>
					<SceneProductSelling />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition
					presentation={fade()}
					timing={springTiming({durationInFrames: TRANS})}
				/>

				<TransitionSeries.Sequence durationInFrames={150}>
					<SceneAssemblingWelding />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition
					presentation={fade()}
					timing={springTiming({durationInFrames: TRANS})}
				/>

				<TransitionSeries.Sequence durationInFrames={120}>
					<SceneMaintenance />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition
					presentation={fade()}
					timing={springTiming({durationInFrames: TRANS})}
				/>

				<TransitionSeries.Sequence durationInFrames={210}>
					<SceneFullFlowSummary />
				</TransitionSeries.Sequence>
			</TransitionSeries>
		</div>
	);
};

export default OrderManagement;
