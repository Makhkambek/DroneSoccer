'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  achievements: string[];
  social: {
    twitter: string;
    instagram: string;
    linkedin: string;
  };
}

export default function TeamManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/team');
      const data = await res.json();
      setMembers(data);
    } catch (error) {
      console.error('Failed to fetch team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (member: TeamMember) => {
    try {
      const method = member.id ? 'PUT' : 'POST';
      const res = await fetch('/api/team', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member),
      });

      if (res.ok) {
        fetchMembers();
        setShowModal(false);
        setEditingMember(null);
      }
    } catch (error) {
      console.error('Failed to save team member:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this team member?')) return;

    try {
      const res = await fetch(`/api/team?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchMembers();
      }
    } catch (error) {
      console.error('Failed to delete team member:', error);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/admin/dashboard" className="text-primary-blue hover:underline text-sm mb-2 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="font-orbitron text-2xl font-bold text-gray-900">
                Team Management
              </h1>
            </div>
            <button
              onClick={() => {
                setEditingMember({
                  id: '',
                  name: '',
                  role: '',
                  bio: '',
                  image: '',
                  achievements: [],
                  social: { twitter: '', instagram: '', linkedin: '' },
                });
                setShowModal(true);
              }}
              className="px-6 py-3 bg-gradient-to-r from-primary-red to-red-700 text-white font-bold rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg"
            >
              + Add Team Member
            </button>
          </div>
        </div>
      </header>

      {/* Team Members List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div key={member.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Image Placeholder</span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-blue text-sm font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.bio}</p>

                {member.achievements.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Achievements:</p>
                    <div className="flex flex-wrap gap-1">
                      {member.achievements.slice(0, 2).map((achievement, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                          {achievement}
                        </span>
                      ))}
                      {member.achievements.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{member.achievements.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingMember(member);
                      setShowModal(true);
                    }}
                    className="flex-1 px-4 py-2 bg-blue-50 text-primary-blue font-semibold rounded-lg hover:bg-blue-100 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="flex-1 px-4 py-2 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-all"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {members.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No team members yet. Add your first team member!</p>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && editingMember && (
        <TeamMemberModal
          member={editingMember}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingMember(null);
          }}
        />
      )}
    </div>
  );
}

function TeamMemberModal({ member, onSave, onClose }: {
  member: TeamMember;
  onSave: (member: TeamMember) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState(member);
  const [achievementInput, setAchievementInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addAchievement = () => {
    if (achievementInput.trim()) {
      setFormData({
        ...formData,
        achievements: [...formData.achievements, achievementInput.trim()],
      });
      setAchievementInput('');
    }
  };

  const removeAchievement = (index: number) => {
    setFormData({
      ...formData,
      achievements: formData.achievements.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="font-orbitron text-2xl font-bold text-gray-900">
            {member.id ? 'Edit Team Member' : 'Add New Team Member'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Role/Position
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              placeholder="/images/team/member.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Achievements
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={achievementInput}
                onChange={(e) => setAchievementInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                placeholder="Add an achievement"
              />
              <button
                type="button"
                onClick={addAchievement}
                className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:opacity-90"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.achievements.map((achievement, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full flex items-center gap-2"
                >
                  {achievement}
                  <button
                    type="button"
                    onClick={() => removeAchievement(idx)}
                    className="text-blue-700 hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Social Media
            </label>
            <div className="space-y-2">
              <input
                type="text"
                value={formData.social.twitter}
                onChange={(e) => setFormData({ ...formData, social: { ...formData.social, twitter: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                placeholder="Twitter URL"
              />
              <input
                type="text"
                value={formData.social.instagram}
                onChange={(e) => setFormData({ ...formData, social: { ...formData.social, instagram: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                placeholder="Instagram URL"
              />
              <input
                type="text"
                value={formData.social.linkedin}
                onChange={(e) => setFormData({ ...formData, social: { ...formData.social, linkedin: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                placeholder="LinkedIn URL"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-red to-red-700 text-white font-semibold rounded-lg hover:opacity-90 transition-all"
            >
              Save Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
