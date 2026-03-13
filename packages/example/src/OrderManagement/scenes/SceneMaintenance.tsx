import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS, NODE} from '../constants';
import {Arrow} from '../components/Arrow';
import {FlowNode} from '../components/FlowNode';
import {ParticipantTag} from '../components/ParticipantTag';
import {SectionTitle} from '../components/SectionTitle';

const CX = 960 - NODE.width / 2;

export const SceneMaintenance: React.FC = () => {
	const frame = useCurrentFrame();

	return (
		<AbsoluteFill style={{backgroundColor: COLORS.bg}}>
			<SectionTitle
				title="Route C — MAINTENANCE"
				subtitle="Operations team manages maintenance jobs directly"
				enterFrame={0}
			/>

			{/* Service type badge */}
			<div
				style={{
					position: 'absolute',
					left: 60,
					top: 115,
					opacity: interpolate(frame, [8, 20], [0, 1], {
						extrapolateRight: 'clamp',
					}),
					backgroundColor: `${COLORS.teamOperations}18`,
					border: `1px solid ${COLORS.teamOperations}44`,
					borderRadius: 6,
					padding: '5px 12px',
					fontFamily: '"SF Mono", monospace',
					fontSize: 12,
					color: COLORS.teamOperations,
					fontWeight: 700,
				}}
			>
				SERVICE TYPE: MAINTENANCE
			</div>

			{/* Comparison: same flow as ASSEMBLING_WELDING */}
			<div
				style={{
					position: 'absolute',
					right: 60,
					top: 115,
					opacity: interpolate(frame, [8, 20], [0, 1], {
						extrapolateRight: 'clamp',
					}),
					backgroundColor: `${COLORS.textMuted}18`,
					border: `1px solid ${COLORS.border}`,
					borderRadius: 6,
					padding: '5px 12px',
					fontFamily: 'system-ui, sans-serif',
					fontSize: 11,
					color: COLORS.textMuted,
				}}
			>
				Same flow as ASSEMBLING_WELDING
			</div>

			{/* APPROVED node */}
			<FlowNode
				label="APPROVED"
				status="APPROVED"
				sublabel="Finance approved — routed to Operations"
				x={CX}
				y={165}
				enterFrame={12}
			/>

			{/* Arrow down */}
			<Arrow
				x1={960}
				y1={233}
				x2={960}
				y2={320}
				drawStartFrame={28}
				color={COLORS.teamOperations}
			/>

			{/* Operations team tag */}
			<ParticipantTag team="Operations" x={CX + 4} y={325} enterFrame={40} />

			{/* PENDING_OPERATIONS */}
			<FlowNode
				label="PENDING_OPERATIONS"
				status="PENDING_OPERATIONS"
				sublabel="Maintenance scope assessed"
				x={CX}
				y={380}
				enterFrame={48}
			/>

			{/* Maintenance specifics */}
			<div
				style={{
					position: 'absolute',
					left: 1100,
					top: 388,
					width: 360,
					opacity: interpolate(frame, [55, 72], [0, 1], {
						extrapolateRight: 'clamp',
					}),
				}}
			>
				{[
					'Inspect equipment on-site',
					'Identify parts & tools needed',
					'Schedule technician team',
					'Submit maintenance plan',
				].map((step, i) => (
					<div
						key={step}
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 10,
							paddingTop: 6,
							paddingBottom: 6,
							borderBottom: `1px solid ${COLORS.border}`,
							fontFamily: 'system-ui, sans-serif',
							fontSize: 12,
							color: COLORS.textSecondary,
						}}
					>
						<span
							style={{
								width: 20,
								height: 20,
								borderRadius: '50%',
								backgroundColor: `${COLORS.teamOperations}22`,
								border: `1px solid ${COLORS.teamOperations}44`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: 10,
								color: COLORS.teamOperations,
								fontWeight: 700,
								flexShrink: 0,
							}}
						>
							{i + 1}
						</span>
						{step}
					</div>
				))}
			</div>

			{/* Arrow: submit plan */}
			<Arrow
				x1={960}
				y1={448}
				x2={960}
				y2={570}
				drawStartFrame={72}
				color={COLORS.statusProduction}
			/>

			<div
				style={{
					position: 'absolute',
					left: 975,
					top: 497,
					fontFamily: 'system-ui, sans-serif',
					fontSize: 11,
					color: COLORS.textMuted,
					fontStyle: 'italic',
					opacity: interpolate(frame, [74, 88], [0, 1], {
						extrapolateRight: 'clamp',
					}),
				}}
			>
				Submit plan
			</div>

			{/* IN_PRODUCTION */}
			<FlowNode
				label="IN_PRODUCTION"
				status="IN_PRODUCTION"
				sublabel="Sales + Finance notified"
				x={CX}
				y={570}
				enterFrame={92}
			/>
		</AbsoluteFill>
	);
};
