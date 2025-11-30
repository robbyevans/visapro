import React, { useState, useEffect } from "react";
import { useAuth } from "../../redux/hooks/useAuth";
import { useUser } from "../../redux/hooks/useUser";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modals/Modal";
import * as S from "./styles";

interface UserSettings {
  notifications: boolean;
  emailUpdates: boolean;
  defaultCountry: string;
  language: string;
}

interface IUserWithSettings {
  id: number;
  name: string;
  email: string;
  role: string;
  settings?: UserSettings;
}

const Settings: React.FC = () => {
  const { handleLogOut } = useAuth();
  const { currentUser } = useUser();
  const [settings, setSettings] = useState<UserSettings>({
    notifications: true,
    emailUpdates: true,
    defaultCountry: "United States",
    language: "English (US)",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load settings from user data when available
  useEffect(() => {
    const userWithSettings = currentUser as IUserWithSettings | null;
    if (userWithSettings?.settings) {
      setSettings(userWithSettings.settings);
    }
  }, [currentUser]);

  const handleSettingChange = (key: keyof UserSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);

    if (currentUser) {
      setIsSaving(true);
      setTimeout(() => setIsSaving(false), 500);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Implement account deletion logic here
      console.info("Account deletion requested for user:", currentUser?.id);
      // await deleteUserAccount(currentUser.id);
      setShowDeleteModal(false);
      handleLogOut();
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };

  return (
    <S.SettingsContainer>
      <S.SettingsHeader>
        <S.SettingsTitle>Settings</S.SettingsTitle>
        <S.SettingsSubtitle>
          Manage your application preferences and account settings
        </S.SettingsSubtitle>
        {isSaving && <S.SavingIndicator>Saving changes...</S.SavingIndicator>}
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
                  checked={settings.notifications}
                  onChange={(e) =>
                    handleSettingChange("notifications", e.target.checked)
                  }
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
                  checked={settings.emailUpdates}
                  onChange={(e) =>
                    handleSettingChange("emailUpdates", e.target.checked)
                  }
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
              <S.Select
                value={settings.defaultCountry}
                onChange={(e) =>
                  handleSettingChange("defaultCountry", e.target.value)
                }
              >
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
              </S.Select>
            </S.SettingItem>

            <S.SettingItem>
              <S.SettingInfo>
                <S.SettingLabel>Language</S.SettingLabel>
                <S.SettingDescription>
                  Interface language preference
                </S.SettingDescription>
              </S.SettingInfo>
              <S.Select
                value={settings.language}
                onChange={(e) =>
                  handleSettingChange("language", e.target.value)
                }
              >
                <option value="English (US)">English (US)</option>
                <option value="English (UK)">English (UK)</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </S.Select>
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
