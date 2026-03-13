import React from 'react';
import {AbsoluteFill} from 'remotion';
import {COLORS, NODE} from '../constants';
import {Arrow} from '../components/Arrow';
import {FlowNode} from '../components/FlowNode';
import {ParticipantTag} from '../components/ParticipantTag';
import {SectionTitle} from '../components/SectionTitle';

// Canvas: 1920x1080
// Center column: x=810 (node centered at 960)
const CX = 960 - NODE.width / 2; // 810

export const SceneOrderCreation: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: COLORS.bg}}>
			<SectionTitle
				title="Step 1 — Order Creation"
				subtitle="Sales team initiates a new service order"
				enterFrame={0}
			/>

			{/* Sales team tag */}
			<ParticipantTag team="Sales" x={CX + 4} y={120} enterFrame={15} />

			{/* New Order node */}
			<FlowNode
				label="New Order Created"
				status="NEW_ORDER"
				sublabel="Sales team submits service request"
				x={CX}
				y={185}
				enterFrame={25}
			/>

			{/* Arrow down */}
			<Arrow
				x1={960}
				y1={253}
				x2={960}
				y2={360}
				drawStartFrame={48}
				color={COLORS.statusPending}
			/>

			{/* PENDING_FINANCE node */}
			<FlowNode
				label="PENDING_FINANCE"
				status="PENDING_FINANCE"
				sublabel="Awaiting Finance team review"
				x={CX}
				y={360}
				enterFrame={68}
			/>

			{/* Label on arrow */}
			<div
				style={{
					position: 'absolute',
					left: 972,
					top: 295,
					fontFamily: 'system-ui, sans-serif',
					fontSize: 11,
					color: COLORS.textMuted,
					fontStyle: 'italic',
				}}
			>
				status set to
			</div>

			{/* Info box */}
			<div
				style={{
					position: 'absolute',
					left: 580,
					top: 520,
					right: 580,
					padding: 20,
					backgroundColor: `${COLORS.bgCard}`,
					border: `1px solid ${COLORS.border}`,
					borderRadius: 10,
					fontFamily: 'system-ui, sans-serif',
					fontSize: 14,
					color: COLORS.textSecondary,
					lineHeight: 1.6,
				}}
			>
				<span style={{color: COLORS.teamSales, fontWeight: 700}}>
					Sales Team
				</span>{' '}
				creates the order with service details. The order enters{' '}
				<span
					style={{
						color: COLORS.statusPending,
						fontFamily: '"SF Mono", monospace',
						fontWeight: 700,
					}}
				>
					PENDING_FINANCE
				</span>{' '}
				status, awaiting Finance approval.
			</div>
		</AbsoluteFill>
	);
};
