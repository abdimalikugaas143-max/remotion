import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS, FONTS, TIMING} from '../constants';
import {ArrowProps} from '../types';

function buildPath(
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	curved: boolean,
): string {
	if (!curved) {
		return `M ${x1} ${y1} L ${x2} ${y2}`;
	}

	// Cubic bezier: depart vertically, arrive vertically
	const cy1 = y1 + (y2 - y1) * 0.5;
	const cy2 = y2 - (y2 - y1) * 0.5;
	return `M ${x1} ${y1} C ${x1} ${cy1}, ${x2} ${cy2}, ${x2} ${y2}`;
}

function approxLength(
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	curved: boolean,
): number {
	if (!curved) {
		const dx = x2 - x1;
		const dy = y2 - y1;
		return Math.sqrt(dx * dx + dy * dy);
	}

	// Approximate bezier length with segments
	const steps = 20;
	let length = 0;
	let prevX = x1;
	let prevY = y1;
	const cy1 = y1 + (y2 - y1) * 0.5;
	const cy2 = y2 - (y2 - y1) * 0.5;
	for (let i = 1; i <= steps; i++) {
		const t = i / steps;
		const mt = 1 - t;
		const nx =
			mt * mt * mt * x1 +
			3 * mt * mt * t * x1 +
			3 * mt * t * t * x2 +
			t * t * t * x2;
		const ny =
			mt * mt * mt * y1 +
			3 * mt * mt * t * cy1 +
			3 * mt * t * t * cy2 +
			t * t * t * y2;
		const dx = nx - prevX;
		const dy = ny - prevY;
		length += Math.sqrt(dx * dx + dy * dy);
		prevX = nx;
		prevY = ny;
	}

	return length;
}

export const Arrow: React.FC<ArrowProps> = ({
	x1,
	y1,
	x2,
	y2,
	drawStartFrame,
	label,
	labelOffsetX = 12,
	labelOffsetY = 0,
	color = COLORS.arrowDefault,
	curved = false,
}) => {
	const frame = useCurrentFrame();
	const localFrame = Math.max(0, frame - drawStartFrame);

	const totalLength = approxLength(x1, y1, x2, y2, curved);
	const drawDuration = TIMING.arrowDrawFrames;

	const progress = interpolate(localFrame, [0, drawDuration], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const strokeDashoffset = totalLength * (1 - progress);

	const headOpacity = interpolate(
		localFrame,
		[drawDuration * 0.75, drawDuration],
		[0, 1],
		{extrapolateRight: 'clamp', extrapolateLeft: 'clamp'},
	);

	const labelOpacity = interpolate(
		localFrame,
		[drawDuration, drawDuration + 10],
		[0, 1],
		{extrapolateRight: 'clamp', extrapolateLeft: 'clamp'},
	);

	const d = buildPath(x1, y1, x2, y2, curved);

	// Arrowhead angle: use last segment direction
	const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

	const labelX = (x1 + x2) / 2 + labelOffsetX;
	const labelY = (y1 + y2) / 2 + labelOffsetY;

	if (progress <= 0) return null;

	return (
		<AbsoluteFill style={{pointerEvents: 'none'}}>
			<svg
				width="1920"
				height="1080"
				style={{position: 'absolute', top: 0, left: 0}}
			>
				<path
					d={d}
					fill="none"
					stroke={color}
					strokeWidth={2}
					strokeDasharray={totalLength}
					strokeDashoffset={strokeDashoffset}
					strokeLinecap="round"
				/>
				<g
					transform={`translate(${x2}, ${y2}) rotate(${angle})`}
					opacity={headOpacity}
				>
					<polygon points="-10,-5 0,0 -10,5" fill={color} />
				</g>
				{label && (
					<text
						x={labelX}
						y={labelY}
						fill={COLORS.textSecondary}
						fontSize={11}
						fontFamily={FONTS.mono}
						opacity={labelOpacity}
						dominantBaseline="middle"
					>
						{label}
					</text>
				)}
			</svg>
		</AbsoluteFill>
	);
};
