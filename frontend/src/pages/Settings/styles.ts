import styled from "styled-components";

export const SettingsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 24px;
`;

export const SettingsHeader = styled.header`
  margin-bottom: 40px;
`;

export const SettingsTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
`;

export const SettingsSubtitle = styled.p`
  font-size: 18px;
  color: #6b7280;
`;

export const SettingsContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
`;

export const SettingsSection = styled.section`
  background: white;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const SectionHeader = styled.div`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px 0;
`;

export const SectionDescription = styled.p`
  color: #6b7280;
  margin: 0;
`;

export const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
`;

export const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`;

export const SettingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SettingLabel = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #111827;
`;

export const SettingDescription = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

export const ToggleContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 52px;
  height: 28px;
`;

export const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #3b82f6;
  }

  &:checked + span:before {
    transform: translateX(24px);
  }
`;

export const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #d1d5db;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

export const DangerZone = styled(SettingsSection)`
  border: 2px solid #fef2f2;
  background-color: #fef2f2;
`;

export const DangerActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const DangerButton = styled.button`
  background: none;
  border: 2px solid #ef4444;
  color: #ef4444;
  padding: 12px 20px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background-color: #ef4444;
    color: white;
  }
`;
