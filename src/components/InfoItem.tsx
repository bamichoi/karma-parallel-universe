import styled from "styled-components";

interface InfoItemProps {
  label: string;
  value: string | number;
}

const InfoItem = ({ label, value }: InfoItemProps) => (
  <InfoItemContainer>
    <Label>{label}</Label>
    <Value>{value}</Value>
  </InfoItemContainer>
);

export default InfoItem;

const InfoItemContainer = styled.div`
  margin-bottom: 0.75rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.span`
  font-weight: 600;
  color: #94a3b8;
  font-size: 0.875rem;
  display: block;
  margin-bottom: 0.25rem;
`;

const Value = styled.span`
  color: #f1f5f9;
  line-height: 1.5;
  display: block;
`;
