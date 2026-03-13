export type StatusType =
	| 'PENDING_FINANCE'
	| 'PENDING_INVENTORY'
	| 'PENDING_OPERATIONS'
	| 'APPROVED'
	| 'REJECTED'
	| 'IN_PRODUCTION'
	| 'COMPLETED'
	| 'ORDER_CLOSED'
	| 'NEW_ORDER';

export type TeamType = 'Sales' | 'Finance' | 'Operations' | 'Inventory';

export interface FlowNodeProps {
	label: string;
	status: StatusType;
	x: number;
	y: number;
	enterFrame: number;
	width?: number;
	height?: number;
	sublabel?: string;
	pulsing?: boolean;
}

export interface ArrowProps {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	drawStartFrame: number;
	label?: string;
	labelOffsetX?: number;
	labelOffsetY?: number;
	color?: string;
	curved?: boolean;
}

export interface ParticipantTagProps {
	team: TeamType;
	x: number;
	y: number;
	enterFrame: number;
}

export interface BranchLabelProps {
	text: string;
	x: number;
	y: number;
	enterFrame: number;
	color?: string;
}

export interface SectionTitleProps {
	title: string;
	subtitle?: string;
	enterFrame: number;
}
