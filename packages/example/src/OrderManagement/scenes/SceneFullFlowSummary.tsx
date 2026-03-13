import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS, NODE, TIMING} from '../constants';
import {Arrow} from '../components/Arrow';
import {BranchLabel} from '../components/BranchLabel';
import {FlowNode} from '../components/FlowNode';

// Full flow rendered at scale 0.72 to fit 1920x1080
// Logical canvas: 1920/0.72 = 2666 x 1500

const S = 0.72; // scale factor
const OX = 0; // offset x after scale
const OY = 20; // offset y after scale

// All logical coordinates (will be scaled)
const nodes = [
	// Main flow
	{
		id: 'new_order',
		label: 'New Order Created',
		status: 'NEW_ORDER' as const,
		x: 960,
		y: 60,
		delay: 0,
	},
	{
		id: 'pending_finance',
		label: 'PENDING_FINANCE',
		status: 'PENDING_FINANCE' as const,
		x: 960,
		y: 200,
		delay: TIMING.staggerPerNode,
	},
	{
		id: 'rejected',
		label: 'REJECTED',
		status: 'REJECTED' as const,
		x: 420,
		y: 370,
		delay: TIMING.staggerPerNode * 2,
	},
	{
		id: 'order_closed',
		label: 'ORDER_CLOSED',
		status: 'ORDER_CLOSED' as const,
		x: 420,
		y: 510,
		delay: TIMING.staggerPerNode * 3,
	},
	{
		id: 'approved',
		label: 'APPROVED',
		status: 'APPROVED' as const,
		x: 1500,
		y: 370,
		delay: TIMING.staggerPerNode * 2,
	},
	// Product selling path
	{
		id: 'pend_inv',
		label: 'PENDING_INVENTORY',
		status: 'PENDING_INVENTORY' as const,
		x: 960,
		y: 550,
		delay: TIMING.staggerPerNode * 4,
	},
	{
		id: 'completed',
		label: 'COMPLETED',
		status: 'COMPLETED' as const,
		x: 580,
		y: 720,
		delay: TIMING.staggerPerNode * 5,
	},
	{
		id: 'pend_ops_ps',
		label: 'PENDING_OPERATIONS',
		status: 'PENDING_OPERATIONS' as const,
		x: 1340,
		y: 720,
		delay: TIMING.staggerPerNode * 6,
	},
	{
		id: 'in_prod_ps',
		label: 'IN_PRODUCTION',
		status: 'IN_PRODUCTION' as const,
		x: 1340,
		y: 880,
		delay: TIMING.staggerPerNode * 7,
	},
	// Assembling path
	{
		id: 'pend_ops_aw',
		label: 'PENDING_OPERATIONS',
		status: 'PENDING_OPERATIONS' as const,
		x: 1700,
		y: 550,
		delay: TIMING.staggerPerNode * 4,
	},
	{
		id: 'in_prod_aw',
		label: 'IN_PRODUCTION',
		status: 'IN_PRODUCTION' as const,
		x: 1700,
		y: 720,
		delay: TIMING.staggerPerNode * 5,
	},
];

const arrows = [
	{x1: 960, y1: 128, x2: 960, y2: 200, delay: 20, color: COLORS.arrowDefault},
	{x1: 960, y1: 268, x2: 700, y2: 370, delay: 35, color: COLORS.statusRejected, curved: true},
	{x1: 960, y1: 268, x2: 1220, y2: 370, delay: 45, color: COLORS.statusApproved, curved: true},
	{x1: 560, y1: 438, x2: 560, y2: 510, delay: 55, color: COLORS.statusRejected},
	{x1: 1500, y1: 438, x2: 960, y2: 550, delay: 65, color: COLORS.teamInventory, curved: true},
	{x1: 1500, y1: 438, x2: 1700, y2: 550, delay: 68, color: COLORS.teamOperations, curved: true},
	{x1: 960, y1: 618, x2: 730, y2: 720, delay: 85, color: COLORS.statusCompleted, curved: true},
	{x1: 960, y1: 618, x2: 1190, y2: 720, delay: 95, color: COLORS.statusPending, curved: true},
	{x1: 1340, y1: 788, x2: 1340, y2: 880, delay: 108, color: COLORS.statusProduction},
	{x1: 1700, y1: 618, x2: 1700, y2: 720, delay: 90, color: COLORS.statusProduction},
];

export const SceneFullFlowSummary: React.FC = () => {
	const frame = useCurrentFrame();

	const panelOpacity = interpolate(frame, [0, 20], [0, 1], {
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{backgroundColor: COLORS.bg}}>
			{/* Header */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					paddingTop: 22,
					paddingBottom: 16,
					paddingLeft: 60,
					borderBottom: `1px solid ${COLORS.border}`,
					backgroundColor: `${COLORS.bg}ee`,
					opacity: panelOpacity,
					zIndex: 10,
				}}
			>
				<div
					style={{
						fontFamily: 'system-ui, sans-serif',
						fontSize: 20,
						fontWeight: 800,
						color: COLORS.textPrimary,
					}}
				>
					Complete Workflow Overview
				</div>
				<div
					style={{
						fontFamily: 'system-ui, sans-serif',
						fontSize: 13,
						color: COLORS.textSecondary,
						marginTop: 3,
					}}
				>
					Service Order Management System — All paths
				</div>
			</div>

			{/* Scaled flow diagram */}
			<div
				style={{
					position: 'absolute',
					top: OY + 80,
					left: OX,
					width: 1920 / S,
					height: (1080 - 80) / S,
					transform: `scale(${S})`,
					transformOrigin: 'top left',
				}}
			>
				{/* Arrows */}
				{arrows.map((a, i) => (
					<Arrow
						key={i}
						x1={a.x1}
						y1={a.y1}
						x2={a.x2}
						y2={a.y2}
						drawStartFrame={a.delay}
						color={a.color}
						curved={a.curved}
					/>
				))}

				{/* Nodes */}
				{nodes.map((n) => (
					<FlowNode
						key={n.id}
						label={n.label}
						status={n.status}
						x={n.x - NODE.width / 2}
						y={n.y}
						enterFrame={n.delay}
						pulsing={frame > 160}
					/>
				))}

				{/* Branch labels */}
				<BranchLabel
					text="REJECTED"
					x={480}
					y={306}
					enterFrame={50}
					color={COLORS.statusRejected}
				/>
				<BranchLabel
					text="APPROVED"
					x={1180}
					y={306}
					enterFrame={60}
					color={COLORS.statusApproved}
				/>
				<BranchLabel
					text="PRODUCT_SELLING"
					x={820}
					y={488}
					enterFrame={78}
					color={COLORS.teamInventory}
				/>
				<BranchLabel
					text="ASSEMBLING / MAINTENANCE"
					x={1510}
					y={488}
					enterFrame={82}
					color={COLORS.teamOperations}
				/>
				<BranchLabel
					text="Ready"
					x={598}
					y={666}
					enterFrame={98}
					color={COLORS.statusCompleted}
				/>
				<BranchLabel
					text="Not Ready"
					x={1150}
					y={666}
					enterFrame={108}
					color={COLORS.statusPending}
				/>
			</div>

			{/* Legend */}
			<div
				style={{
					position: 'absolute',
					bottom: 20,
					right: 30,
					display: 'flex',
					gap: 16,
					opacity: interpolate(frame, [140, 160], [0, 1], {
						extrapolateRight: 'clamp',
					}),
				}}
			>
				{[
					{color: COLORS.statusPending, label: 'Pending'},
					{color: COLORS.statusApproved, label: 'Approved'},
					{color: COLORS.statusRejected, label: 'Rejected'},
					{color: COLORS.statusProduction, label: 'In Production'},
					{color: COLORS.statusCompleted, label: 'Completed'},
				].map(({color, label}) => (
					<div
						key={label}
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 6,
						}}
					>
						<div
							style={{
								width: 10,
								height: 10,
								borderRadius: 2,
								backgroundColor: color,
							}}
						/>
						<span
							style={{
								fontFamily: 'system-ui, sans-serif',
								fontSize: 11,
								color: COLORS.textSecondary,
							}}
						>
							{label}
						</span>
					</div>
				))}
			</div>
		</AbsoluteFill>
	);
};
