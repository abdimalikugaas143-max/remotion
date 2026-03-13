import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS, FONTS, NODE} from '../constants';
import {Arrow} from '../components/Arrow';
import {BranchLabel} from '../components/BranchLabel';
import {FlowNode} from '../components/FlowNode';
import {ParticipantTag} from '../components/ParticipantTag';
import {SectionTitle} from '../components/SectionTitle';

const CX = 960 - NODE.width / 2;

const DiamondDecision: React.FC<{enterFrame: number}> = ({enterFrame}) => {
	const frame = useCurrentFrame();
	const localFrame = Math.max(0, frame - enterFrame);
	const opacity = interpolate(localFrame, [0, 12], [0, 1], {
		extrapolateRight: 'clamp',
	});
	const scale = interpolate(localFrame, [0, 12], [0.7, 1], {
		extrapolateRight: 'clamp',
	});

	return (
		<div
			style={{
				position: 'absolute',
				left: 912,
				top: 330,
				width: 96,
				height: 96,
				opacity,
				transform: `scale(${scale})`,
				transformOrigin: '50% 50%',
			}}
		>
			<svg width={96} height={96} viewBox="0 0 96 96">
				<polygon
					points="48,4 92,48 48,92 4,48"
					fill={COLORS.bgCard}
					stroke={COLORS.teamFinance}
					strokeWidth={2}
				/>
				<text
					x={48}
					y={52}
					textAnchor="middle"
					dominantBaseline="middle"
					fill={COLORS.teamFinance}
					fontSize={9}
					fontFamily={FONTS.mono}
					fontWeight="700"
				>
					REVIEW
				</text>
			</svg>
		</div>
	);
};

export const SceneFinanceReview: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: COLORS.bg}}>
			<SectionTitle
				title="Step 2 — Finance Review"
				subtitle="Finance team evaluates payment terms and profitability"
				enterFrame={0}
			/>

			{/* Finance team tag */}
			<ParticipantTag team="Finance" x={CX + 4} y={120} enterFrame={10} />

			{/* PENDING_FINANCE status */}
			<FlowNode
				label="PENDING_FINANCE"
				status="PENDING_FINANCE"
				sublabel="Order under Finance review"
				x={CX}
				y={185}
				enterFrame={15}
			/>

			{/* Finance review steps (sidebar) */}
			<div
				style={{
					position: 'absolute',
					left: 1100,
					top: 193,
					display: 'flex',
					flexDirection: 'column',
					gap: 8,
				}}
			>
				{[
					'Verify payment terms',
					'Assess profitability margin',
					'Check client credit risk',
				].map((text) => (
					<div
						key={text}
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 8,
							fontFamily: 'system-ui, sans-serif',
							fontSize: 13,
							color: COLORS.textSecondary,
						}}
					>
						<span style={{color: COLORS.teamFinance, fontSize: 8}}>◆</span>
						{text}
					</div>
				))}
			</div>

			{/* Arrow down to diamond */}
			<Arrow
				x1={960}
				y1={253}
				x2={960}
				y2={330}
				drawStartFrame={35}
				color={COLORS.arrowDefault}
			/>

			{/* Decision diamond */}
			<DiamondDecision enterFrame={50} />

			{/* Left curved arrow — REJECTED */}
			<Arrow
				x1={912}
				y1={390}
				x2={620}
				y2={540}
				drawStartFrame={65}
				color={COLORS.statusRejected}
				curved
			/>

			{/* Right curved arrow — APPROVED */}
			<Arrow
				x1={1008}
				y1={390}
				x2={1300}
				y2={540}
				drawStartFrame={75}
				color={COLORS.statusApproved}
				curved
			/>

			{/* REJECTED node */}
			<FlowNode
				label="REJECTED"
				status="REJECTED"
				sublabel="Finance declines the order"
				x={470}
				y={540}
				enterFrame={85}
			/>

			<BranchLabel
				text="REJECTED"
				x={592}
				y={468}
				enterFrame={87}
				color={COLORS.statusRejected}
			/>

			{/* APPROVED node */}
			<FlowNode
				label="APPROVED"
				status="APPROVED"
				sublabel="Proceeds to service routing"
				x={1150}
				y={540}
				enterFrame={95}
			/>

			<BranchLabel
				text="APPROVED"
				x={1206}
				y={468}
				enterFrame={97}
				color={COLORS.statusApproved}
			/>

			{/* Rejected → ORDER_CLOSED */}
			<Arrow
				x1={620}
				y1={608}
				x2={620}
				y2={700}
				drawStartFrame={110}
				color={COLORS.statusRejected}
			/>

			<FlowNode
				label="ORDER_CLOSED"
				status="ORDER_CLOSED"
				sublabel="Reason recorded — Sales notified"
				x={470}
				y={700}
				enterFrame={128}
			/>
		</AbsoluteFill>
	);
};
