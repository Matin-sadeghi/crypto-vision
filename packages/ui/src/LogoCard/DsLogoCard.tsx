import { DsBox } from '../Box';
import { DsTypography } from '../Typography';

type DsLogoCardProps = {
  title?: string;
  onlyLogo?: boolean;
  logoSrc?: string;
  alt?: string;
  taglinePrefix?: string;
  taglineHighlight?: string;
};

export const DsLogoCard = ({
  title,
  onlyLogo = false,
  logoSrc = '/logo.png',
  alt = 'nDecision',
  taglinePrefix = 'Build better decisions with',
  taglineHighlight = 'causal intelligence',
}: DsLogoCardProps) => {
  if (onlyLogo) {
    return <img src={logoSrc} alt={alt} className="w-full h-full object-contain" />;
  }

  return (
    <DsBox>
      <img src={logoSrc} alt={alt} className="w-12 h-12" />
      <DsBox className="mt-8 max-w-[300px]">
        {title ? (
          <DsTypography variant="h2" color="textPrimary" className="font-bold">
            {title}
          </DsTypography>
        ) : (
          <DsTypography variant="h2" color="textPrimary" className="font-bold">
            {taglinePrefix}{' '}
            <DsTypography as="span" variant="h2" color="tertiary" className="font-bold">
              {taglineHighlight}
            </DsTypography>
          </DsTypography>
        )}
      </DsBox>
    </DsBox>
  );
};
