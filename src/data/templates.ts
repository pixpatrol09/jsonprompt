import type { PromptData } from '../stores/promptStore'

export interface PromptTemplate {
  id: string
  name: string
  description: string
  category: 'fashion' | 'product' | 'portrait' | 'lifestyle' | 'commercial' | 'editorial'
  thumbnail?: string
  data: PromptData
  tags: string[]
  author: string
  createdAt: string
}

export const TEMPLATE_CATEGORIES = [
  { key: 'fashion', label: 'Fashion', icon: '👗' },
  { key: 'product', label: 'Product', icon: '📦' },
  { key: 'portrait', label: 'Portrait', icon: '👤' },
  { key: 'lifestyle', label: 'Lifestyle', icon: '🌟' },
  { key: 'commercial', label: 'Commercial', icon: '💼' },
  { key: 'editorial', label: 'Editorial', icon: '📸' }
] as const

export const PRESET_TEMPLATES: PromptTemplate[] = [
  {
    id: 'fashion-editorial-1',
    name: 'Fashion Editorial Studio',
    description: 'High-end fashion photography with professional studio lighting',
    category: 'fashion',
    tags: ['studio', 'editorial', 'high-fashion', 'professional'],
    author: 'Prompt Studio',
    createdAt: '2025-01-01',
    data: {
      fidelity_priority: "Outfit must be exactly the same, pose is maintained, and the original model's face, race, and skin tone must remain exactly as provided.",
      task: "background_integration",
      input_image: "Fashion model in designer clothing",
      background_description: "Professional photography studio with seamless white backdrop, professional lighting setup with softboxes and key lights creating dramatic shadows",
      instructions: {
        preserve_subject: true,
        preserve_details: true,
        pose_locked: true,
        no_face_or_garment_modification: true,
        scale_and_alignment: "match original proportions and placement",
        integration_style: "editorial",
        lighting_match: true,
        shadow_blending: true,
        color_grading: "high contrast",
        output_resolution: "2048x2048",
        logos: "Preserve original logo shape, size, and position",
        product_features: "Preserve garment material, color, fit, silhouette, and texture. No hallucinations or alterations."
      },
      model_lock: {
        preserve_proportions: true,
        feet_position_locked: true,
        head_position_locked: true,
        arms_position_locked: true,
        legs_position_locked: true,
        outfit_position_locked: true,
        no_body_warping: true,
        no_pose_generation: true,
        no_scale_distortion: true,
        camera_perspective_locked: true,
        preserve_skin_tone: true,
        preserve_race: true,
        preserve_face_identity: true,
        preserve_subject_position: true,
        preserve_frame_ratio: true
      },
      additional_details: {
        visual_style: "Editorial, cinematic, with a focus on dynamic athletic posture",
        lighting: "Professional studio lighting with controlled highlights and dramatic shadows",
        integration_priority: "Scene realism must not override model or product accuracy"
      }
    }
  },
  {
    id: 'product-commercial-1',
    name: 'Product Commercial Shot',
    description: 'Clean commercial product photography for e-commerce',
    category: 'product',
    tags: ['commercial', 'clean', 'e-commerce', 'product'],
    author: 'Prompt Studio',
    createdAt: '2025-01-01',
    data: {
      fidelity_priority: "Product must maintain exact appearance, colors, and proportions. No modifications to product features or branding.",
      task: "background_integration",
      input_image: "Product on neutral background",
      background_description: "Clean white studio background with subtle gradient, professional product photography lighting",
      instructions: {
        preserve_subject: true,
        preserve_details: true,
        pose_locked: true,
        no_face_or_garment_modification: true,
        scale_and_alignment: "center and scale to fit",
        integration_style: "commercial",
        lighting_match: true,
        shadow_blending: true,
        color_grading: "neutral",
        output_resolution: "1920x1080",
        logos: "Preserve all branding elements exactly as shown",
        product_features: "Maintain exact product appearance, materials, colors, and details"
      },
      model_lock: {
        preserve_proportions: true,
        feet_position_locked: false,
        head_position_locked: false,
        arms_position_locked: false,
        legs_position_locked: false,
        outfit_position_locked: true,
        no_body_warping: true,
        no_pose_generation: true,
        no_scale_distortion: true,
        camera_perspective_locked: true,
        preserve_skin_tone: true,
        preserve_race: true,
        preserve_face_identity: true,
        preserve_subject_position: false,
        preserve_frame_ratio: false
      },
      additional_details: {
        visual_style: "Commercial product photography with high-end commercial appeal",
        lighting: "Soft window lighting with gentle shadows",
        integration_priority: "Product accuracy is paramount over artistic interpretation"
      }
    }
  },
  {
    id: 'lifestyle-outdoor-1',
    name: 'Lifestyle Outdoor Scene',
    description: 'Natural lifestyle photography in outdoor environments',
    category: 'lifestyle',
    tags: ['outdoor', 'natural', 'lifestyle', 'candid'],
    author: 'Prompt Studio',
    createdAt: '2025-01-01',
    data: {
      fidelity_priority: "Maintain natural appearance while allowing for environmental integration and mood enhancement.",
      task: "background_integration",
      input_image: "Person in casual lifestyle setting",
      background_description: "Beautiful outdoor environment with natural lighting, park or urban setting with trees and natural elements",
      instructions: {
        preserve_subject: true,
        preserve_details: true,
        pose_locked: false,
        no_face_or_garment_modification: true,
        scale_and_alignment: "match original proportions and placement",
        integration_style: "lifestyle",
        lighting_match: true,
        shadow_blending: true,
        color_grading: "warm tone",
        output_resolution: "1920x1080",
        logos: "Preserve original logo shape, size, and position",
        product_features: "Preserve garment material, color, fit, silhouette, and texture"
      },
      model_lock: {
        preserve_proportions: true,
        feet_position_locked: false,
        head_position_locked: false,
        arms_position_locked: false,
        legs_position_locked: false,
        outfit_position_locked: false,
        no_body_warping: true,
        no_pose_generation: false,
        no_scale_distortion: true,
        camera_perspective_locked: false,
        preserve_skin_tone: true,
        preserve_race: true,
        preserve_face_identity: true,
        preserve_subject_position: false,
        preserve_frame_ratio: false
      },
      additional_details: {
        visual_style: "Lifestyle photography with natural, candid feel",
        lighting: "Golden hour warm lighting with dramatic shadows",
        integration_priority: "Balance between scene integration and subject preservation"
      }
    }
  },
  {
    id: 'portrait-professional-1',
    name: 'Professional Portrait',
    description: 'Corporate headshot with professional background',
    category: 'portrait',
    tags: ['professional', 'corporate', 'headshot', 'business'],
    author: 'Prompt Studio',
    createdAt: '2025-01-01',
    data: {
      fidelity_priority: "Face and expression must remain exactly the same. Professional appearance is critical.",
      task: "background_integration",
      input_image: "Professional headshot portrait",
      background_description: "Clean professional office background with subtle blur, modern corporate environment",
      instructions: {
        preserve_subject: true,
        preserve_details: true,
        pose_locked: true,
        no_face_or_garment_modification: true,
        scale_and_alignment: "match original proportions and placement",
        integration_style: "portrait",
        lighting_match: true,
        shadow_blending: true,
        color_grading: "neutral",
        output_resolution: "1024x1024",
        logos: "Preserve original logo shape, size, and position",
        product_features: "Preserve garment material, color, fit, silhouette, and texture"
      },
      model_lock: {
        preserve_proportions: true,
        feet_position_locked: true,
        head_position_locked: true,
        arms_position_locked: true,
        legs_position_locked: true,
        outfit_position_locked: true,
        no_body_warping: true,
        no_pose_generation: true,
        no_scale_distortion: true,
        camera_perspective_locked: true,
        preserve_skin_tone: true,
        preserve_race: true,
        preserve_face_identity: true,
        preserve_subject_position: true,
        preserve_frame_ratio: true
      },
      additional_details: {
        visual_style: "Portrait photography with professional studio quality",
        lighting: "Professional portrait lighting setup",
        integration_priority: "Focus on technical accuracy over creative interpretation"
      }
    }
  }
]
