import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS, NODE} from '../constants';
import {Arrow} from '../components/Arrow';
import {FlowNode} from '../components/FlowNode';
import {SectionTitle} from '../components/SectionTitle';

const CX = 960 - NODE.width / 2;

export const SceneRejectedPath: React.FC = () => {
	const frame = useCurrentFrame();

	const redGlow = interpolate(frame % 50, [0, 25, 50], [0.2, 0.7, 0.2]);

	return (
		<AbsoluteFill style={{backgroundColor: COLORS.bg}}>
			<SectionTitle
				title="Rejection Path"
				subtitle="Finance declines the order — order is closed"
				enterFrame={0}
			/>

			{/* Ambient red glow overlay */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: `radial-gradient(ellipse at 50% 40%, ${COLORS.statusRejected}${Math.round(redGlow * 30)
						.toString(16)
						.padStart(2, '0')} 0%, transparent 60%)`,
					pointerEvents: 'none',
				}}
			/>

			{/* PENDING_FINANCE */}
			<FlowNode
				label="PENDING_FINANCE"
				status="PENDING_FINANCE"
				sublabel="Finance review in progress"
				x={CX}
				y={185}
				enterFrame={10}
			/>

			<Arrow
				x1={960}
				y1={253}
				x2={960}
				y2={350}
				drawStartFrame={28}
				color={COLORS.statusRejected}
			/>

			{/* REJECTED */}
			<FlowNode
				label="REJECTED"
				status="REJECTED"
				sublabel="Payment or profitability issues found"
				x={CX}
				y={350}
				enterFrame={48}
				pulsing
			/>

			{/* Rejection reason box */}
			<div
				style={{
					position: 'absolute',
					left: 1060,
					top: 358,
					width: 420,
					padding: 18,
					backgroundColor: `${COLORS.statusRejected}10`,
					border: `1px solid ${COLORS.statusRejected}44`,
					borderRadius: 10,
					opacity: interpolate(frame, [60, 80], [0, 1], {
						extrapolateRight: 'clamp',
					}),
				}}
			>
				<div
					style={{
						fontFamily: '"SF Mono", monospace',
						fontSize: 11,
						color: COLORS.statusRejected,
						fontWeight: 700,
						marginBottom: 8,
						letterSpacing: '0.05em',
					}}
				>
					REJECTION REASONS
				</div>
				{[
					'Insufficient profit margin',
					'Payment terms not acceptable',
					'Client credit risk too high',
					'Budget constraints',
				].map((reason) => (
					<div
						key={reason}
						style={{
							fontFamily: 'system-ui, sans-serif',
							fontSize: 12,
							color: COLORS.textSecondary,
							paddingTop: 4,
							paddingBottom: 4,
							borderBottom: `1px solid ${COLORS.border}`,
							display: 'flex',
							alignItems: 'center',
							gap: 8,
						}}
					>
						<span style={{color: COLORS.statusRejected, fontSize: 10}}>✕</span>
						{reason}
					</div>
				))}
			</div>

			<Arrow
				x1={960}
				y1={418}
				x2={960}
				y2={540}
				drawStartFrame={75}
				color={COLORS.statusRejected}
			/>

			{/* ORDER_CLOSED */}
			<FlowNode
				label="ORDER_CLOSED"
				status="ORDER_CLOSED"
				sublabel="Reason recorded — Sales team notified"
				x={CX}
				y={540}
				enterFrame={95}
			/>

			{/* Final note */}
			<div
				style={{
					position: 'absolute',
					left: 580,
					top: 680,
					right: 580,
					textAlign: 'center',
					fontFamily: 'system-ui, sans-serif',
					fontSize: 14,
					color: COLORS.textMuted,
					opacity: interpolate(frame, [100, 115], [0, 1], {
						extrapolateRight: 'clamp',
					}),
				}}
			>
				Sales team receives rejection notification with detailed reason
			</div>
		</AbsoluteFill>
	);
};
