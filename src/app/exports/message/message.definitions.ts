export interface MessageDataOptions {
  hiDuration?: number;
  hiAnimate?: boolean;
  hiPauseOnHover?: boolean;
}

// Message data for terminal users
export interface MessageData {
  // TODO: remove the literal parts as it's widened anyway
  type?: 'success' | 'info' | 'warning' | 'error' | 'loading' | string;
  content?: string;
}

// Filled version of MessageData (includes more private properties)
export interface MessageDataFilled extends MessageData {
  messageId: string; // Service-wide unique id, auto generated
  state?: 'enter' | 'leave';
  options?: MessageDataOptions;
  createdAt: Date; // Auto created
}
