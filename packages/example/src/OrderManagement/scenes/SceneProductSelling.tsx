import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS, NODE} from '../constants';
import {Arrow} from '../components/Arrow';
import {BranchLabel} from '../components/BranchLabel';
import {FlowNode} from '../components/FlowNode';
import {ParticipantTag} from '../components/ParticipantTag';
import {SectionTitle} from '../components/SectionTitle';

const NW = NODE.width;

export const SceneProductSelling: React.FC = () => {
	const frame = useCurrentFrame();

	return (
		<AbsoluteFill style={{backgroundColor: COLORS.bg}}>
			<SectionTitle
				title="Route A — PRODUCT_SELLING"
				subtitle="Inventory team checks product availability"
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
					backgroundColor: `${COLORS.teamInventory}18`,
					border: `1px solid ${COLORS.teamInventory}44`,
					borderRadius: 6,
					padding: '5px 12px',
					fontFamily: '"SF Mono", monospace',
					fontSize: 12,
					color: COLORS.teamInventory,
					fontWeight: 700,
				}}
			>
				SERVICE TYPE: PRODUCT_SELLING
			</div>

			{/* APPROVED node at top */}
			<FlowNode
				label="APPROVED"
				status="APPROVED"
				sublabel="Finance approved — routing to Inventory"
				x={960 - NW / 2}
				y={165}
				enterFrame={12}
			/>

			{/* Arrow down */}
			<Arrow
				x1={960}
				y1={233}
				x2={960}
				y2={310}
				drawStartFrame={30}
				color={COLORS.teamInventory}
			/>

			{/* Inventory team tag */}
			<ParticipantTag
				team="Inventory"
				x={960 - NW / 2 + 4}
				y={315}
				enterFrame={45}
			/>

			{/* PENDING_INVENTORY */}
			<FlowNode
				label="PENDING_INVENTORY"
				status="PENDING_INVENTORY"
				sublabel="Inventory team checks stock"
				x={960 - NW / 2}
				y={370}
				enterFrame={50}
			/>

			{/* Arrow left — product ready */}
			<Arrow
				x1={960}
				y1={438}
				x2={640}
				y2={565}
				drawStartFrame={72}
				color={COLORS.statusCompleted}
				curved
			/>

			{/* Arrow right — not ready */}
			<Arrow
				x1={960}
				y1={438}
				x2={1280}
				y2={565}
				drawStartFrame={84}
				color={COLORS.statusPending}
				curved
			/>

			<BranchLabel
				text="Product Ready"
				x={648}
				y={495}
				enterFrame={88}
				color={COLORS.statusCompleted}
			/>

			<BranchLabel
				text="Not Ready"
				x={1188}
				y={495}
				enterFrame={98}
				color={COLORS.statusPending}
			/>

			{/* COMPLETED */}
			<FlowNode
				label="COMPLETED"
				status="COMPLETED"
				sublabel="Customer logged internally"
				x={490}
				y={565}
				enterFrame={95}
			/>

			{/* PENDING_OPERATIONS (product not ready) */}
			<FlowNode
				label="PENDING_OPERATIONS"
				status="PENDING_OPERATIONS"
				sublabel="Sent to Operations team"
				x={1130}
				y={565}
				enterFrame={108}
			/>

			{/* Arrow from ops to production */}
			<Arrow
				x1={1280}
				y1={633}
				x2={1280}
				y2={730}
				drawStartFrame={125}
				color={COLORS.statusProduction}
			/>

			{/* Ops team tag */}
			<ParticipantTag team="Operations" x={1130 + 4} y={700} enterFrame={138} />

			{/* Submit plan note */}
			<div
				style={{
					position: 'absolute',
					left: 1140,
					top: 660,
					fontFamily: 'system-ui, sans-serif',
					fontSize: 11,
					color: COLORS.textMuted,
					fontStyle: 'italic',
					opacity: interpolate(frame, [130, 145], [0, 1], {
						extrapolateRight: 'clamp',
					}),
				}}
			>
				Submit production plan
			</div>

			{/* IN_PRODUCTION */}
			<FlowNode
				label="IN_PRODUCTION"
				status="IN_PRODUCTION"
				sublabel="Sales + Finance notified"
				x={1130}
				y={745}
				enterFrame={145}
			/>

			{/* Notify note */}
			<div
				style={{
					position: 'absolute',
					left: 490,
					top: 700,
					width: 320,
					padding: 14,
					backgroundColor: `${COLORS.statusCompleted}0d`,
					border: `1px solid ${COLORS.statusCompleted}33`,
					borderRadius: 8,
					opacity: interpolate(frame, [110, 125], [0, 1], {
						extrapolateRight: 'clamp',
					}),
				}}
			>
				<div
					style={{
						fontFamily: '"SF Mono", monospace',
						fontSize: 10,
						color: COLORS.statusCompleted,
						fontWeight: 700,
						marginBottom: 6,
					}}
				>
					COMPLETED
				</div>
				<div
					style={{
						fontFamily: 'system-ui, sans-serif',
						fontSize: 12,
						color: COLORS.textSecondary,
						lineHeight: 1.5,
					}}
				>
					Product shipped from existing stock. Customer delivery logged.
				</div>
			</div>
		</AbsoluteFill>
	);
};
