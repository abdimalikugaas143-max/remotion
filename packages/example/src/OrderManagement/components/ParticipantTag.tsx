import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS, FONTS} from '../constants';
import {ParticipantTagProps, TeamType} from '../types';

const TEAM_COLORS: Record<TeamType, string> = {
	Sales: COLORS.teamSales,
	Finance: COLORS.teamFinance,
	Operations: COLORS.teamOperations,
	Inventory: COLORS.teamInventory,
};

const TEAM_ICONS: Record<TeamType, string> = {
	Sales: '◆',
	Finance: '▲',
	Operations: '●',
	Inventory: '■',
};

export const ParticipantTag: React.FC<ParticipantTagProps> = ({
	team,
	x,
	y,
	enterFrame,
}) => {
	const frame = useCurrentFrame();
	const localFrame = Math.max(0, frame - enterFrame);
	const opacity = interpolate(localFrame, [0, 12], [0, 1], {
		extrapolateRight: 'clamp',
	});
	const translateX = interpolate(localFrame, [0, 12], [-20, 0], {
		extrapolateRight: 'clamp',
	});

	const color = TEAM_COLORS[team];
	const icon = TEAM_ICONS[team];

	return (
		<div
			style={{
				position: 'absolute',
				left: x,
				top: y,
				opacity,
				transform: `translateX(${translateX}px)`,
				display: 'flex',
				alignItems: 'center',
				gap: 8,
				backgroundColor: `${color}18`,
				border: `1px solid ${color}44`,
				borderRadius: 20,
				paddingLeft: 12,
				paddingRight: 14,
				paddingTop: 5,
				paddingBottom: 5,
			}}
		>
			<span style={{color, fontSize: 9}}>{icon}</span>
			<span
				style={{
					color,
					fontFamily: FONTS.heading,
					fontSize: 12,
					fontWeight: 600,
					letterSpacing: '0.06em',
					textTransform: 'uppercase',
				}}
			>
				{team} Team
			</span>
		</div>
	);
};
