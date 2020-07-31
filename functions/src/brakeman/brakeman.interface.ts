export interface BrakemanOutput {
  scan_info: ScanInfo;
  warnings: BrakemanWarning[];
  ignored_warning: any[];
  errors: BrakemanError[];
  obsolete: any[];
}

export interface ScanInfo {
  app_path: string;
  rails_version: string;
  security_warnings: number; // total security warnings
  start_time: string; // Date object
  end_time: string; // Date object
  duration: number; // in seconds
  checks_performed: BrakemanCheck[];
  number_of_controllers: number;
  number_of_models: number;
  number_of_templates: number;
  ruby_version: string;
  brakeman_version: string;
}

export interface BrakemanWarning {
  warning_type: string;
  warning_code: number;
  fingerprint: string;
  check_name: BrakemanCheck; // probably needs an enum
  message: string;
  file: string; // project relative path to file
  line: number;
  link: string; // link to check documentation
  code: string;
  render_path: any;
  location: CodeLocation;
  user_input: string;
  confidence: ConfidenceLevel;
}
export interface BrakemanError {
  error: string;
  location: string;
}

export enum BrakemanCheck {
  BasicAuth = 'BasicAuth',
  BasicAuthTimingAttack = 'BasicAuthTimingAttack',
  ContentTag = 'ContentTag',
  CookieSerialization = 'CookieSerialization',
  CreateWith = 'CreateWith',
  CrossSiteScripting = 'CrossSiteScripting',
  DefaultRoutes = 'DefaultRoutes',
  Deserialize = 'Deserialize',
  DetailedExceptions = 'DetailedExceptions',
  DigestDoS = 'DigestDoS',
  DynamicFinders = 'DynamicFinders',
  EscapeFunction = 'EscapeFunction',
  Evaluation = 'Evaluation',
  Execute = 'Execute',
  FileAccess = 'FileAccess',
  FileDisclosure = 'FileDisclosure',
  FilterSkipping = 'FilterSkipping',
  ForgerySetting = 'ForgerySetting',
  HeaderDoS = 'HeaderDoS',
  I18nXSS = 'I18nXSS',
  JRubyXML = 'JRubyXML',
  JSONEncoding = 'JSONEncoding',
  JSONEntityEscape = 'JSONEntityEscape',
  JSONParsing = 'JSONParsing',
  LinkTo = 'LinkTo',
  LinkToHref = 'LinkToHref',
  MailTo = 'MailTo',
  MassAssignment = 'MassAssignment',
  MimeTypeDoS = 'MimeTypeDoS',
  ModelAttrAccessible = 'ModelAttrAccessible',
  ModelAttributes = 'ModelAttributes',
  ModelSerialize = 'ModelSerialize',
  NestedAttributes = 'NestedAttributes',
  NestedAttributesBypass = 'NestedAttributesBypass',
  NumberToCurrency = 'NumberToCurrency',
  PageCachingCVE = 'PageCachingCVE',
  PermitAttributes = 'PermitAttributes',
  QuoteTableName = 'QuoteTableName',
  Redirect = 'Redirect',
  RegexDoS = 'RegexDoS',
  Render = 'Render',
  RenderDoS = 'RenderDoS',
  RenderInline = 'RenderInline',
  ResponseSplitting = 'ResponseSplitting',
  RouteDoS = 'RouteDoS',
  SQL = 'SQL',
  SQLCVEs = 'SQLCVEs',
  SSLVerify = 'SSLVerify',
  SafeBufferManipulation = 'SafeBufferManipulation',
  SanitizeMethods = 'SanitizeMethods',
  SelectTag = 'SelectTag',
  SelectVulnerability = 'SelectVulnerability',
  Send = 'Send',
  SendFile = 'SendFile',
  SessionManipulation = 'SessionManipulation',
  SessionSettings = 'SessionSettings',
  SimpleFormat = 'SimpleFormat',
  SingleQuotes = 'SingleQuotes',
  SkipBeforeFilter = 'SkipBeforeFilter',
  SprocketsPathTraversal = 'SprocketsPathTraversal',
  StripTags = 'StripTags',
  SymbolDoSCVE = 'SymbolDoSCVE',
  TranslateBug = 'TranslateBug',
  UnsafeReflection = 'UnsafeReflection',
  ValidationRegex = 'ValidationRegex',
  WithoutProtection = 'WithoutProtection',
  XMLDoS = 'XMLDoS',
  YAMLParsing = 'YAMLParsing',
}

export interface CodeLocation {
  type: CodeType; // enum?
  class: string;
  method: string;
}

export enum CodeType {
  Method = 'method',
  Template = 'template',
}

export enum ConfidenceLevel {
  High = 'High',
  Medium = 'Medium',
  Weak = 'Weak',
}
