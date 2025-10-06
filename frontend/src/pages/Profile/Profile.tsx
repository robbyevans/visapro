import React, { useState } from "react";
import { useUser } from "../../redux/hooks/useUser";
import Input from "../../components/Forms/Input";
import Button from "../../components/Button/Button";
import Spinner from "../../components/Spinner/Spinner";
import * as S from "./styles";

const Profile: React.FC = () => {
  const { currentUser, isLoading } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
  });

  const handleSave = async () => {
    if (currentUser) {
      // await updateUser(formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: currentUser?.name || "",
      email: currentUser?.email || "",
    });
    setIsEditing(false);
  };

  if (!currentUser) {
    return (
      <S.ProfileContainer>
        <Spinner size="lg" />
      </S.ProfileContainer>
    );
  }

  return (
    <S.ProfileContainer>
      <S.ProfileHeader>
        <S.ProfileTitle>Profile Settings</S.ProfileTitle>
        <S.ProfileSubtitle>
          Manage your account information and preferences
        </S.ProfileSubtitle>
      </S.ProfileHeader>

      <S.ProfileContent>
        <S.ProfileSection>
          <S.SectionHeader>
            <S.SectionTitle>Personal Information</S.SectionTitle>
            {!isEditing && (
              <Button variant="secondary" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </S.SectionHeader>

          {isEditing ? (
            <>
              <S.FormGrid>
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, name: value }))
                  }
                  placeholder="Enter your full name"
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, email: value }))
                  }
                  placeholder="Enter your email"
                  required
                />
              </S.FormGrid>
              <S.FormActions>
                <Button
                  variant="secondary"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSave}
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Save Changes
                </Button>
              </S.FormActions>
            </>
          ) : (
            <S.InfoGrid>
              <S.InfoItem>
                <S.InfoLabel>Full Name</S.InfoLabel>
                <S.InfoValue>{currentUser.name}</S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>Email Address</S.InfoLabel>
                <S.InfoValue>{currentUser.email}</S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>Account Type</S.InfoLabel>
                <S.RoleBadge role={currentUser.role}>
                  {currentUser.role}
                </S.RoleBadge>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>User ID</S.InfoLabel>
                <S.InfoValue>#{currentUser.id}</S.InfoValue>
              </S.InfoItem>
            </S.InfoGrid>
          )}
        </S.ProfileSection>

        <S.ProfileSection>
          <S.SectionHeader>
            <S.SectionTitle>Account Security</S.SectionTitle>
          </S.SectionHeader>
          <S.SectionDescription>
            Manage your password and account security settings
          </S.SectionDescription>
          <Button
            variant="primary"
            onClick={() => (window.location.href = "/password-reset")}
          >
            Change Password
          </Button>
        </S.ProfileSection>

        <S.ProfileSection>
          <S.SectionHeader>
            <S.SectionTitle>Application Statistics</S.SectionTitle>
          </S.SectionHeader>
          <S.SectionDescription>
            Overview of your visa application activity
          </S.SectionDescription>
          <S.InfoGrid>
            <S.InfoItem>
              <S.InfoLabel>Total Applications</S.InfoLabel>
              <S.InfoValue>12</S.InfoValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoLabel>Pending Review</S.InfoLabel>
              <S.InfoValue>3</S.InfoValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoLabel>Approved</S.InfoLabel>
              <S.InfoValue>8</S.InfoValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoLabel>Completed</S.InfoLabel>
              <S.InfoValue>5</S.InfoValue>
            </S.InfoItem>
          </S.InfoGrid>
        </S.ProfileSection>
      </S.ProfileContent>
    </S.ProfileContainer>
  );
};

export default Profile;
