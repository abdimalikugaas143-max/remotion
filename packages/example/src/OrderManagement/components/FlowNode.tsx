import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, FONTS, NODE} from '../constants';
import {FlowNodeProps, StatusType} from '../types';

const STATUS_COLORS: Record<StatusType, string> = {
	PENDING_FINANCE: COLORS.statusPending,
	PENDING_INVENTORY: COLORS.statusPending,
	PENDING_OPERATIONS: COLORS.statusPending,
	APPROVED: COLORS.statusApproved,
	REJECTED: COLORS.statusRejected,
	IN_PRODUCTION: COLORS.statusProduction,
	COMPLETED: COLORS.statusCompleted,
	ORDER_CLOSED: COLORS.statusRejected,
	NEW_ORDER: COLORS.teamSales,
};

export const FlowNode: React.FC<FlowNodeProps> = ({
	label,
	status,
	x,
	y,
	enterFrame,
	width = NODE.width,
	height = NODE.height,
	sublabel,
	pulsing = false,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const localFrame = Math.max(0, frame - enterFrame);
	const scale = spring({
		frame: localFrame,
		fps,
		config: {damping: 14, stiffness: 120, mass: 0.8},
		from: 0.75,
		to: 1,
	});
	const opacity = interpolate(localFrame, [0, 8], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const accent = STATUS_COLORS[status];

	const pulseOpacity = pulsing
		? interpolate(frame % 60, [0, 30, 60], [0.2, 0.7, 0.2])
		: 0.15;

	return (
		<div
			style={{
				position: 'absolute',
				left: x,
				top: y,
				width,
				height,
				transform: `scale(${scale})`,
				transformOrigin: 'center center',
				opacity,
				backgroundColor: COLORS.bgCard,
				border: `1px solid ${COLORS.border}`,
				borderLeft: `4px solid ${accent}`,
				borderRadius: NODE.radius,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				paddingLeft: 16,
				paddingRight: 12,
				boxShadow: `0 0 24px ${accent}${Math.round(pulseOpacity * 255)
					.toString(16)
					.padStart(2, '0')}`,
			}}
		>
			<span
				style={{
					color: COLORS.textPrimary,
					fontFamily: FONTS.mono,
					fontSize: 13,
					fontWeight: 700,
					letterSpacing: '0.04em',
				}}
			>
				{label}
			</span>
			{sublabel && (
				<span
					style={{
						color: COLORS.textSecondary,
						fontFamily: FONTS.heading,
						fontSize: 11,
						marginTop: 3,
					}}
				>
					{sublabel}
				</span>
			)}
		</div>
	);
};
