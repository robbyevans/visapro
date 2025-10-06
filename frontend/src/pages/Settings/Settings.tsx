import React, { useState } from "react";
import { useAuth } from "../../redux/hooks/useAuth";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modals/Modal";
import * as S from "./styles";

const Settings: React.FC = () => {
  const { handleLogOut } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteAccount = () => {
    // Implement account deletion logic
    console.log("Account deletion requested");
    setShowDeleteModal(false);
  };

  return (
    <S.SettingsContainer>
      <S.SettingsHeader>
        <S.SettingsTitle>Settings</S.SettingsTitle>
        <S.SettingsSubtitle>
          Manage your application preferences and account settings
        </S.SettingsSubtitle>
      </S.SettingsHeader>

      <S.SettingsContent>
        <S.SettingsSection>
          <S.SectionHeader>
            <S.SectionTitle>Notification Preferences</S.SectionTitle>
            <S.SectionDescription>
              Control how and when you receive notifications
            </S.SectionDescription>
          </S.SectionHeader>

          <S.SettingsGrid>
            <S.SettingItem>
              <S.SettingInfo>
                <S.SettingLabel>Push Notifications</S.SettingLabel>
                <S.SettingDescription>
                  Receive browser notifications for application updates
                </S.SettingDescription>
              </S.SettingInfo>
              <S.ToggleContainer>
                <S.ToggleInput
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
                <S.ToggleSlider />
              </S.ToggleContainer>
            </S.SettingItem>

            <S.SettingItem>
              <S.SettingInfo>
                <S.SettingLabel>Email Updates</S.SettingLabel>
                <S.SettingDescription>
                  Receive email notifications for important updates
                </S.SettingDescription>
              </S.SettingInfo>
              <S.ToggleContainer>
                <S.ToggleInput
                  type="checkbox"
                  checked={emailUpdates}
                  onChange={(e) => setEmailUpdates(e.target.checked)}
                />
                <S.ToggleSlider />
              </S.ToggleContainer>
            </S.SettingItem>
          </S.SettingsGrid>
        </S.SettingsSection>

        <S.SettingsSection>
          <S.SectionHeader>
            <S.SectionTitle>Application Settings</S.SectionTitle>
            <S.SectionDescription>
              Configure your application preferences
            </S.SectionDescription>
          </S.SectionHeader>

          <S.SettingsGrid>
            <S.SettingItem>
              <S.SettingInfo>
                <S.SettingLabel>Default Country</S.SettingLabel>
                <S.SettingDescription>
                  Set your preferred destination country
                </S.SettingDescription>
              </S.SettingInfo>
              <Button variant="secondary">Change</Button>
            </S.SettingItem>

            <S.SettingItem>
              <S.SettingInfo>
                <S.SettingLabel>Language</S.SettingLabel>
                <S.SettingDescription>English (US)</S.SettingDescription>
              </S.SettingInfo>
              <Button variant="secondary">Change</Button>
            </S.SettingItem>
          </S.SettingsGrid>
        </S.SettingsSection>

        <S.SettingsSection>
          <S.SectionHeader>
            <S.SectionTitle>Session Management</S.SectionTitle>
            <S.SectionDescription>
              Manage your active sessions and account access
            </S.SectionDescription>
          </S.SectionHeader>

          <Button variant="secondary" onClick={handleLogOut}>
            Sign Out of All Devices
          </Button>
        </S.SettingsSection>

        <S.DangerZone>
          <S.SectionHeader>
            <S.SectionTitle>Danger Zone</S.SectionTitle>
            <S.SectionDescription>
              Irreversible and destructive actions
            </S.SectionDescription>
          </S.SectionHeader>

          <S.DangerActions>
            <S.DangerButton onClick={() => setShowDeleteModal(true)}>
              Delete Account
              <div style={{ fontSize: "12px", marginTop: "4px" }}>
                Permanently delete your account and all associated data
              </div>
            </S.DangerButton>
          </S.DangerActions>
        </S.DangerZone>
      </S.SettingsContent>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Account"
        size="sm"
      >
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <p style={{ marginBottom: "20px", color: "#6b7280" }}>
            Are you sure you want to delete your account? This action cannot be
            undone and all your data will be permanently lost.
          </p>
          <div
            style={{ display: "flex", gap: "12px", justifyContent: "center" }}
          >
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </div>
        </div>
      </Modal>
    </S.SettingsContainer>
  );
};

export default Settings;
